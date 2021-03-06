import React from 'react';
import { CrownOutlined } from '@ant-design/icons';
import { List } from 'antd';

import { Avatar, Box, Paragraph, Tag, Title } from '@/components/atoms';
import { ActionsDropdown, DropdownAction } from '@/components/molecules';
import { UseSquadMembers } from '@/graphql/squads';
import { CFC } from '@/typings/components';
import { TeamRole } from '@/typings/graphql';
import { pick } from '@/utils/objects';

import { useSquadContext } from '../SquadContext';
import { UpdateSquadMemberModalData } from './UpdateSquadMemberModal';

export type SquadMemberProps = {
  member: UseSquadMembers['item'];
  openSquadMemberModal: (data: UpdateSquadMemberModalData) => void;
};

const getRoleTag = (role: TeamRole) => {
  if (role === TeamRole.Owner) return <Tag color="geekblue">Owner</Tag>;
  if (role === TeamRole.Manager) return <Tag color="blue">Manager</Tag>;

  return <Tag color="cyan">Member</Tag>;
};

const SquadMember: CFC<SquadMemberProps> = ({ member, openSquadMemberModal }) => {
  const { squadRole } = useSquadContext();

  const actions: DropdownAction[] = squadRole.isOwner
    ? [
        {
          label: 'Change role',
          icon: CrownOutlined,
          onClick: () => {
            openSquadMemberModal({
              ...pick(member, ['id', 'role']),
              userId: member.user.id,
            });
          },
        },
      ]
    : [];

  const title = (
    <Box display="flex" alignItems="center">
      <Title level={4} mr={12}>
        {member.user.fullName}
      </Title>
      {getRoleTag(member.role)}
    </Box>
  );

  const positions = member.activePositions
    .map(({ chapter, position: { name: positionName } }) => {
      return chapter ? `${positionName} in ${chapter.name} chapter` : positionName;
    })
    .join('\n');

  const description = <Paragraph whiteSpace="pre-line">{positions || 'No active positions'}</Paragraph>;

  return (
    <List.Item>
      <List.Item.Meta avatar={<Avatar src={member.user.image} />} title={title} description={description} />
      <ActionsDropdown actions={actions} />
    </List.Item>
  );
};

export default SquadMember;
