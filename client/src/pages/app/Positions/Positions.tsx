import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

import { Button } from '@/components/atoms';
import { Card, FiltersCard, Page } from '@/components/molecules';
import { usePositions } from '@/graphql/positions';
import { useAuthorizedUser } from '@/graphql/users';
import { useDataModal } from '@/services/modals';

import { Position } from './Position';
import { PositionModal, PositionModalData } from './PositionModal';

const Positions = () => {
  const { isAdmin } = useAuthorizedUser();
  const [search, setSearch] = useQueryParam('search', withDefault(StringParam, ''));
  const positions = usePositions({ search });
  const positionModal = useDataModal<PositionModalData>();

  return (
    <Page>
      <Page.Header
        title="Positions"
        subTitle="Find out all positions available across CodersCrew"
        extra={
          isAdmin
            ? [
                <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => positionModal.open(null)}>
                  Create position
                </Button>,
              ]
            : null
        }
      />
      <Page.Content>
        <FiltersCard search={{ value: search, onSearch: setSearch }} />
        <Card>
          <List
            rowKey="id"
            size="small"
            itemLayout="horizontal"
            loading={positions.loading}
            dataSource={positions.data}
            renderItem={item => <Position key={item.id} openEditModal={positionModal.open} {...item} />}
          />
        </Card>
      </Page.Content>
      <PositionModal {...positionModal} />
    </Page>
  );
};

export default Positions;
