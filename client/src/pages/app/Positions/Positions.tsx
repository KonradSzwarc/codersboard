import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { Button } from '@/components/atoms';
import { Page } from '@/components/molecules';
import { usePositions } from '@/graphql/positions';
import { useModalState } from '@/hooks/useModalState';
import { down } from '@/utils/styling';

import { Position } from './Position';
import { PositionModal, PositionModalProps } from './PositionModal';

const CardsGrid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',

  [down('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  [down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
});

const Positions = () => {
  const positions = usePositions();
  const positionModal = useModalState<PositionModalProps['data']>();

  return (
    <Page>
      <Page.Header
        title="Positions"
        subTitle="Find out all positions available across CodersCrew"
        extra={[
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => positionModal.open()}>
            Create position
          </Button>,
        ]}
      />
      <Page.Content>
        <CardsGrid>
          {positions.data.map(position => (
            <Position key={position.id} openEditModal={positionModal.open} {...position} />
          ))}
        </CardsGrid>
      </Page.Content>
      {positionModal.isMounted && (
        <PositionModal visible={positionModal.isVisible} data={positionModal.data} onCancel={positionModal.close} />
      )}
    </Page>
  );
};

export default Positions;
