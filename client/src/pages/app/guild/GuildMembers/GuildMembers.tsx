import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CrownOutlined, DeleteOutlined, PartitionOutlined } from '@ant-design/icons';

import { Box } from '@/components/atoms';
import { Card, FiltersCard, Table, TableActions } from '@/components/molecules';
import { UseGuildMembers, useGuildMembers } from '@/graphql/guilds';
import { useDataModal } from '@/services/dataModal';
import { pick } from '@/utils/objects';

import { useGuildContext } from '../GuildContext';
import { GuildMemberModal, GuildMemberModalData } from './GuildMemberModal';
import { useDeleteGuildMemberConfirm } from './useDeleteGuildMemberConfirm';
import { useGuildMembersColumns } from './useGuildMembersColumns';

type Member = UseGuildMembers['item'];

const GuildMembers = () => {
  const navigate = useNavigate();
  const { guildId, guildRole } = useGuildContext();
  const guildMembers = useGuildMembers({ guildId });
  const guildMemberModal = useDataModal<GuildMemberModalData>();
  const columns = useGuildMembersColumns();
  const deleteGuildMemberConfirm = useDeleteGuildMemberConfirm();

  const actions: TableActions<Member> = [
    {
      label: 'Change role',
      icon: CrownOutlined,
      onClick: member => {
        guildMemberModal.open({
          ...pick(member, ['id', 'role']),
          userId: member.user.id,
        });
      },
    },
    {
      label: 'Manage positions',
      icon: PartitionOutlined,
      visible: member => !!member.positions.length,
      onClick: member => navigate(`../positions?search=${encodeURI(member.user.fullName)}`),
    },
    {
      label: 'Delete member',
      icon: DeleteOutlined,
      itemProps: member => ({ danger: !member.positions.length }),
      disabled: member => !!member.positions.length,
      onClick: member => deleteGuildMemberConfirm({ id: member.id, fullName: member.user.fullName }),
    },
  ];

  return (
    <>
      <FiltersCard
        addButton={guildRole.isManager && { label: 'Add member', onClick: () => guildMemberModal.open(null) }}
      />
      <Box maxWidth="100%" overflow="auto">
        <Card>
          <Table
            loading={guildMembers.loading}
            dataSource={guildMembers.data}
            columns={columns}
            actions={guildRole.isManager ? actions : []}
            pagination={false}
          />
        </Card>
      </Box>
      <GuildMemberModal {...guildMemberModal} />
    </>
  );
};

export default GuildMembers;