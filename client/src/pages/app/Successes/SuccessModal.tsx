import React from 'react';
import { addDays, isFuture } from 'date-fns';
import { FormikConfig } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { DatePicker } from '@/components/formik';
import { FormikModal } from '@/components/molecules';
import { FormikSuccessTypeSelect, FormikUserSelect } from '@/components/selects';
import { useSuccessMutations } from '@/graphql/successes';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { SuccessType } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

const { getInitialValues, validationSchema, fields } = createFormFields({
  name: yup.string().label('Success name').required().default(''),
  description: yup.string().label('Description').required().default(''),
  date: yup.date().required().label('Date').max(addDays(new Date(), 1)),
  type: yup
    .mixed<SuccessType>()
    .label('Type of the success')
    .required()
    .oneOf(Object.values(SuccessType))
    .default(SuccessType.Epic),
  usersIds: yup.array(yup.string().required()).label('Users participating in the success').required().default([]),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

export type SuccessModalData = WithId<FormValues> | null;

type SuccessModalProps = DataModalProps<SuccessModalData>;

const useSuccessModal = ({ data, ...modalProps }: SuccessModalProps) => {
  const { createSuccess, updateSuccess } = useSuccessMutations();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const mutation = data ? updateSuccess({ ...values, id: data.id }) : createSuccess(values);

    runMutation({
      mutation,
      success: () => modalProps.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('success', data ? 'update' : 'create'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: data ? 'Edit success' : 'Add a new success',
      okText: data ? 'Update success' : 'Add success',
    },
    form: {
      initialValues: getInitialValues(data),
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

export const SuccessModal = createDataModal<SuccessModalProps>(props => {
  const { form, modal } = useSuccessModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item {...fields.name}>
          <Input name={fields.name.name} placeholder="Enter position name..." />
        </Form.Item>
        <Form.Item {...fields.description}>
          <Input.TextArea name={fields.description.name} placeholder="Enter description..." />
        </Form.Item>
        <Form.Item {...fields.date}>
          <DatePicker
            name={fields.date.name}
            placeholder="Choose success date..."
            allowClear={false}
            disabledDate={isFuture}
          />
        </Form.Item>
        <Form.Item {...fields.type}>
          <FormikSuccessTypeSelect name={fields.type.name} />
        </Form.Item>
        <Form.Item {...fields.usersIds}>
          <FormikUserSelect name={fields.usersIds.name} mode="multiple" />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
