import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import AccountDetailModal from './AccountDetailModal';
import AdjustBalanceModal from './AdjustBalanceModal';
import FreezeAccountModal from './FreezeAccountModal';
import FreezeBalanceModal from './FreezeBalanceModal';

type Account = {
  id: string;
  name: string;
  userType: string;
  businessLine: string;
  type: 'SETTLEMENT' | 'SERVICE_INCOME';
  subType: string;
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
      id: '001',
      name: '张三',
      userType: '商家',
      businessLine: 'A',
      type: 'SETTLEMENT',
      subType: '服务收入账户',
      status: 'active',
      balance: 100.0,
      frozenAmount: 50.0,
      availableAmount: 50.0,
      createdAt: '2023-01-01 10:00:00',
      updatedAt: '2023-07-28 15:30:00',
    },
    {
      id: '002',
      name: '李四',
      userType: '商家',
      businessLine: 'B',
      type: 'SETTLEMENT',
      subType: '服务收入账户',
      status: 'active',
      balance: 2987.98,
      frozenAmount: 0.0,
      availableAmount: 2987.98,
      createdAt: '2023-02-15 09:15:00',
      updatedAt: '2023-07-29 11:20:00',
    },
    {
      id: '003',
      name: '王五',
      userType: '商家',
      businessLine: 'C',
      type: 'SETTLEMENT',
      subType: '服务收入账户',
      status: 'active',
      balance: 22019.8,
      frozenAmount: 0.0,
      availableAmount: 22019.8,
      createdAt: '2023-03-20 14:30:00',
      updatedAt: '2023-07-30 16:45:00',
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
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [freezeModalVisible, setFreezeModalVisible] = useState(false);
  const [isFreezeBalanceModalVisible, setFreezeBalanceModalVisible] =
    useState(false);
  const [adjustModalVisible, setAdjustModalVisible] = useState(false);

  const columns: ProColumns<Account>[] = [
    {
      title: '开户人ID',
      dataIndex: 'id',
      copyable: true,
      search: true,
    },
    {
      title: '类型',
      dataIndex: 'userType',
      search: false,
    },
    {
      title: '开户人名称',
      dataIndex: 'name',
      ellipsis: true,
      search: true,
    },
    {
      title: '业务线',
      dataIndex: 'businessLine',
      search: true,
    },
    {
      title: '账户类型',
      dataIndex: 'type',
      filters: true,
      valueEnum: {
        SETTLEMENT: { text: '结算账户' },
        SERVICE_INCOME: { text: '服务收入账户' },
      },
    },
    {
      title: '账户子类型',
      dataIndex: 'subType',
      search: true,
    },
    {
      title: '账户余额',
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
      title: '可用余额',
      dataIndex: 'availableAmount',
      valueType: 'money',
      sorter: (a, b) => a.availableAmount - b.availableAmount,
      search: false,
    },
    {
      title: '账户状态',
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
      title: '操作',
      valueType: 'option',
      width: 240,
      render: (_, record) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              minWidth: 200,
              maxWidth: 300,
              flexWrap: 'wrap',
              gap: 4,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: 4,
                flexWrap: 'wrap',
              }}
            >
              <a
                key="details"
                style={{ color: '#1890ff', flex: 1, textAlign: 'center' }}
                onClick={() => {
                  setCurrentAccount(record);
                  setDetailModalVisible(true);
                }}
              >
                详情
              </a>
              <a
                key="transactions"
                style={{ color: '#1890ff', flex: 1, textAlign: 'center' }}
                onClick={() => {
                  message.info(`查看账户明细: ${record.id}`);
                }}
              >
                明细
              </a>
              <a
                key="adjust"
                style={{ color: '#1890ff', flex: 1, textAlign: 'center' }}
                onClick={() => {
                  setCurrentAccount(record);
                  setAdjustModalVisible(true);
                }}
              >
                调账
              </a>
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: 4,
                flexWrap: 'wrap',
              }}
            >
              <a
                key="freeze"
                style={{ color: '#1890ff', flex: 1, textAlign: 'center' }}
                onClick={() => {
                  setFreezeModalVisible(true);
                }}
              >
                {record.status === 'frozen' ? '解冻账户' : '冻结账户'}
              </a>
              <a
                key="freezeBalance"
                style={{ color: '#1890ff', flex: 1, textAlign: 'center' }}
                onClick={() => {
                  setFreezeBalanceModalVisible(true);
                }}
              >
                冻结余额
              </a>
              <span style={{ flex: 1 }}></span>
            </div>
          </div>
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
          defaultCollapsed: false,
          span: 6,
          layout: 'vertical',
          collapseRender: false,
        }}
        scroll={{ x: 'max-content' }}
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
      <AccountDetailModal
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        account={currentAccount}
      />
      <FreezeAccountModal
        visible={freezeModalVisible}
        onCancel={() => setFreezeModalVisible(false)}
        onSubmit={(freezeType) => {
          message.success(`冻结类型: ${freezeType}`);
          setFreezeModalVisible(false);
          actionRef.current?.reload();
        }}
      />
      <FreezeBalanceModal
        visible={isFreezeBalanceModalVisible}
        onCancel={() => setFreezeBalanceModalVisible(false)}
        onSubmit={() => {
          /* handle submit */
        }}
      />
      <AdjustBalanceModal
        visible={adjustModalVisible}
        onCancel={() => setAdjustModalVisible(false)}
        account={currentAccount}
      />
    </PageContainer>
  );
};

export default AccountManagementPage;
