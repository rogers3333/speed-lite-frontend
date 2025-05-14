import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';

type Account = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'frozen' | 'suspended' | 'closed';
  balance: number;
  frozenAmount: number;
  availableAmount: number;
  createdAt: string;
  updatedAt: string;
};

const statusMap = {
  active: { text: '正常', color: 'green' },
  frozen: { text: '冻结', color: 'red' },
  suspended: { text: '暂停', color: 'orange' },
  closed: { text: '关闭', color: 'default' },
};

// 模拟数据
const getAccounts = async (params: any) => {
  const accounts: Account[] = [
    {
      id: 'ACC100001',
      name: '张三的账户',
      type: 'NORMAL',
      status: 'active',
      balance: 10000.50,
      frozenAmount: 0,
      availableAmount: 10000.50,
      createdAt: '2023-01-01 10:00:00',
      updatedAt: '2023-07-28 15:30:00',
    },
    {
      id: 'ACC100002',
      name: '李四的账户',
      type: 'VIP',
      status: 'active',
      balance: 50000.75,
      frozenAmount: 0,
      availableAmount: 50000.75,
      createdAt: '2023-02-15 09:15:00',
      updatedAt: '2023-07-29 11:20:00',
    },
    {
      id: 'ACC100003',
      name: '王五的账户',
      type: 'NORMAL',
      status: 'frozen',
      balance: 5000.25,
      frozenAmount: 5000.25,
      availableAmount: 0,
      createdAt: '2023-03-10 14:20:00',
      updatedAt: '2023-07-30 09:40:00',
    },
    {
      id: 'ACC100004',
      name: '智慧科技有限公司',
      type: 'BUSINESS',
      status: 'active',
      balance: 200000.00,
      frozenAmount: 20000.00,
      availableAmount: 180000.00,
      createdAt: '2023-04-05 16:30:00',
      updatedAt: '2023-07-31 10:15:00',
    },
    {
      id: 'ACC100005',
      name: '赵六的账户',
      type: 'NORMAL',
      status: 'closed',
      balance: 0,
      frozenAmount: 0,
      availableAmount: 0,
      createdAt: '2023-01-20 11:10:00',
      updatedAt: '2023-06-15 14:30:00',
    },
  ];

  const { current = 1, pageSize = 10 } = params;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: accounts.slice(startIndex, endIndex),
    total: accounts.length,
    success: true,
  };
};

const AccountManagementPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Account>[] = [
    {
      title: '账户ID',
      dataIndex: 'id',
      copyable: true,
    },
    {
      title: '账户名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '账户类型',
      dataIndex: 'type',
      filters: true,
      valueEnum: {
        NORMAL: { text: '普通账户' },
        VIP: { text: 'VIP账户' },
        BUSINESS: { text: '企业账户' },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      valueEnum: {
        active: { text: '正常', status: 'Success' },
        frozen: { text: '冻结', status: 'Error' },
        suspended: { text: '暂停', status: 'Warning' },
        closed: { text: '关闭', status: 'Default' },
      },
      render: (_, record) => (
        <Tag color={statusMap[record.status].color}>
          {statusMap[record.status].text}
        </Tag>
      ),
    },
    {
      title: '总余额',
      dataIndex: 'balance',
      valueType: 'money',
      sorter: (a, b) => a.balance - b.balance,
      search: false,
    },
    {
      title: '冻结金额',
      dataIndex: 'frozenAmount',
      valueType: 'money',
      sorter: (a, b) => a.frozenAmount - b.frozenAmount,
      search: false,
    },
    {
      title: '可用金额',
      dataIndex: 'availableAmount',
      valueType: 'money',
      sorter: (a, b) => a.availableAmount - b.availableAmount,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return (
          <Space>
            <a
              key="edit"
              onClick={() => {
                message.info(`编辑账户: ${record.id}`);
              }}
            >
              编辑
            </a>
            <a
              key="freeze"
              onClick={() => {
                message.success(`${record.status === 'frozen' ? '解冻' : '冻结'}账户: ${record.id}`);
                actionRef.current?.reload();
              }}
            >
              {record.status === 'frozen' ? '解冻' : '冻结'}
            </a>
            <a
              key="details"
              onClick={() => {
                message.info(`查看账户详情: ${record.id}`);
              }}
            >
              详情
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<Account>
        headerTitle="账户列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              message.success('新建账户');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={getAccounts}
        columns={columns}
      />
    </PageContainer>
  );
};

export default AccountManagementPage; 