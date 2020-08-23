import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { Dropdown, Menu } from 'antd';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';

import { Button, Icon } from '@/components/atoms';
import { RFC } from '@/typings/components';

export type DropdownAction = Omit<MenuItemProps, 'children' | 'icon'> & { label: string; icon: RFC<AntdIconProps> };

export type ActionsDropdownProps = {
  actions: DropdownAction[];
};

export const ActionsDropdown = ({ actions }: ActionsDropdownProps) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          {actions.map(({ label, icon, ...action }) => (
            <Menu.Item key={label} {...action}>
              <Icon icon={icon} />
              {label}
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={['click']}
    >
      <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
    </Dropdown>
  );
};