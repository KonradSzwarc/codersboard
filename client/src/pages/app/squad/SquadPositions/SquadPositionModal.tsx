import React from 'react';
import { isAfter, isBefore, isFuture } from 'date-fns';
import { FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { Box } from '@/components/atoms';
import { DatePicker, DatePickerProps } from '@/components/formik';
import { FormikModal } from '@/components/molecules';
import { FormikChapterSelect, FormikPositionSelect } from '@/components/selects';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { useSquadMembersIds, useSquadPositionMutations } from '@/graphql/squads';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { PositionScope } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';
import { pick } from '@/utils/objects';

import { useSquadContext } from '../SquadContext';

const { getInitialValues, validationSchema, fields } = createFormFields({
  from: yup.date().label('Start date').required(),
  to: yup.date().label('End date').optional().nullable(),
  notes: yup.string().label('Notes about position').optional().nullable(),
  memberId: yup.string().label('Squad member').required(),
  positionId: yup.string().label('Position').required(),
  chapterId: yup.string().label('Chapter').optional(),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

export type SquadPositionModalData = WithId<FormValues> | null;

type SquadPositionModalProps = DataModalProps<SquadPositionModalData>;

const pickerProps: Partial<DatePickerProps> = {
  picker: 'month',
  style: { width: '100%' },
};

const useSquadPositionModal = (props: SquadPositionModalProps) => {
  const { data, ...modalProps } = props;

  const { squadId } = useSquadContext();
  const { createSquadPosition, updateSquadPosition } = useSquadPositionMutations();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const mutation = data
      ? updateSquadPosition({ ...pick(values, ['from', 'to', 'notes']), id: data.id, squadId })
      : createSquadPosition({ ...values, squadId });

    runMutation({
      mutation,
      success: () => props.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('squad position', data ? 'update' : 'create'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: data ? 'Edit position' : 'Add position',
      okText: data ? 'Update position' : 'Add position',
    },
    form: {
      initialValues: getInitialValues(data),
      validationSchema,
      onSubmit: handleSubmit,
    },
    isUpdateModal: Boolean(data),
  };
};

const FromPicker = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <Form.Item {...fields.from}>
      <DatePicker
        name={fields.from.name}
        allowClear={false}
        placeholder="Choose start date..."
        {...pickerProps}
        disabledDate={current => {
          if (isFuture(current)) return true;
          return values.to ? isAfter(current, values.to) : false;
        }}
      />
    </Form.Item>
  );
};

const ToPicker = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <Form.Item {...fields.to}>
      <DatePicker
        name={fields.to.name}
        placeholder="Choose end date..."
        {...pickerProps}
        disabledDate={current => {
          if (isFuture(current)) return true;
          return values.from ? isBefore(current, values.from) : false;
        }}
      />
    </Form.Item>
  );
};

const UserPicker = (props: { isUpdateModal: boolean }) => {
  const { squadId } = useSquadContext();
  const squadMembersIds = useSquadMembersIds({ squadId });

  return (
    <Form.Item {...fields.memberId}>
      <FormikUserSelect
        name={fields.memberId.name}
        placeholder="Select team member..."
        ids={squadMembersIds.membersUserIds}
        idMapper={squadMembersIds.userIdToMemberIdMap}
        disabled={props.isUpdateModal}
        showSearch
      />
    </Form.Item>
  );
};

const ChapterPicker = (props: { isUpdateModal: boolean }) => {
  const { squadId } = useSquadContext();

  return (
    <Form.Item {...fields.chapterId}>
      <FormikChapterSelect
        squadId={squadId}
        name={fields.chapterId.name}
        placeholder="Select chapter for the role..."
        allowClear
        disabled={props.isUpdateModal}
      />
    </Form.Item>
  );
};

export const SquadPositionModal = createDataModal<SquadPositionModalProps>(props => {
  const { form, modal, isUpdateModal } = useSquadPositionModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <UserPicker isUpdateModal={isUpdateModal} />
        <Form.Item {...fields.positionId}>
          <FormikPositionSelect
            name={fields.positionId.name}
            placeholder="Select position..."
            disabled={isUpdateModal}
            scopes={[PositionScope.Squad]}
          />
        </Form.Item>
        <Box display="flex">
          <Box width={1 / 2}>
            <FromPicker />
          </Box>
          <Box width={40} />
          <Box width={1 / 2}>
            <ToPicker />
          </Box>
        </Box>
        <Form.Item {...fields.notes}>
          <Input.TextArea name={fields.notes.name} placeholder="Enter notes..." />
        </Form.Item>
        <ChapterPicker isUpdateModal={isUpdateModal} />
      </Form>
    </FormikModal>
  );
});
