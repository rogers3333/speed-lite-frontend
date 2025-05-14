import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Divider, Tag } from 'antd';
import React, { useRef } from 'react';

type Transaction = {
  id: string;
  accountId: string;
  counterpartyId: string | null;
  type: string;
  amount: number;
  balance: number;
  status: 'success' | 'pending' | 'failed';
  description: string;
  transactionTime: string;
  operatorId: string;
};

const statusMap = {
  success: { text: '成功', color: 'green' },
  pending: { text: '处理中', color: 'gold' },
  failed: { text: '失败', color: 'red' },
};

// 模拟数据
const getTransactions = async (params: any) => {
  const transactions: Transaction[] = [
    {
      id: 'TRX10001',
      accountId: 'ACC100001',
      counterpartyId: 'ACC100002',
      type: 'TRANSFER_OUT',
      amount: -1000.00,
      balance: 9000.50,
      status: 'success',
      description: '转账至李四账户',
      transactionTime: '2023-07-31 15:20:30',
      operatorId: 'USER001',
    },
    {
      id: 'TRX10002',
      accountId: 'ACC100002',
      counterpartyId: 'ACC100001',
      type: 'TRANSFER_IN',
      amount: 1000.00,
      balance: 51000.75,
      status: 'success',
      description: '收到来自张三的转账',
      transactionTime: '2023-07-31 15:20:30',
      operatorId: 'SYSTEM',
    },
    {
      id: 'TRX10003',
      accountId: 'ACC100001',
      counterpartyId: null,
      type: 'WITHDRAW',
      amount: -500.00,
      balance: 8500.50,
      status: 'success',
      description: '提现到银行卡',
      transactionTime: '2023-07-30 10:30:15',
      operatorId: 'USER001',
    },
    {
      id: 'TRX10004',
      accountId: 'ACC100003',
      counterpartyId: null,
      type: 'FREEZE',
      amount: -5000.25,
      balance: 0,
      status: 'success',
      description: '账户资金冻结',
      transactionTime: '2023-07-30 09:40:00',
      operatorId: 'ADMIN001',
    },
    {
      id: 'TRX10005',
      accountId: 'ACC100004',
      counterpartyId: null,
      type: 'DEPOSIT',
      amount: 50000.00,
      balance: 230000.00,
      status: 'success',
      description: '充值',
      transactionTime: '2023-07-29 14:15:10',
      operatorId: 'USER004',
    },
    {
      id: 'TRX10006',
      accountId: 'ACC100004',
      counterpartyId: null,
      type: 'FREEZE',
      amount: -20000.00,
      balance: 230000.00,
      status: 'success',
      description: '部分资金冻结',
      transactionTime: '2023-07-28 16:30:25',
      operatorId: 'ADMIN001',
    },
    {
      id: 'TRX10007',
      accountId: 'ACC100002',
      counterpartyId: null,
      type: 'WITHDRAW',
      amount: -1000.00,
      balance: 50000.75,
      status: 'pending',
      description: '提现处理中',
      transactionTime: '2023-07-31 16:45:00',
      operatorId: 'USER002',
    },
    {
      id: 'TRX10008',
      accountId: 'ACC100001',
      counterpartyId: null,
      type: 'WITHDRAW',
      amount: -2000.00,
      balance: 8500.50,
      status: 'failed',
      description: '提现失败-余额不足',
      transactionTime: '2023-07-30 11:30:00',
      operatorId: 'USER001',
    },
  ];

  const { current = 1, pageSize = 10 } = params;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: transactions.slice(startIndex, endIndex),
    total: transactions.length,
    success: true,
  };
};

const TransactionsPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Transaction>[] = [
    {
      title: '交易ID',
      dataIndex: 'id',
      copyable: true,
      fixed: 'left',
      width: 120,
    },
    {
      title: '账户ID',
      dataIndex: 'accountId',
      copyable: true,
    },
    {
      title: '对方账户',
      dataIndex: 'counterpartyId',
      copyable: true,
      render: (text) => text || '-',
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      filters: true,
      valueEnum: {
        TRANSFER_IN: { text: '转入' },
        TRANSFER_OUT: { text: '转出' },
        DEPOSIT: { text: '充值' },
        WITHDRAW: { text: '提现' },
        FREEZE: { text: '冻结' },
        UNFREEZE: { text: '解冻' },
        FEE: { text: '手续费' },
      },
      render: (_, record) => {
        const getColorByType = (type: string) => {
          switch (type) {
            case 'TRANSFER_IN':
            case 'DEPOSIT':
            case 'UNFREEZE':
              return 'green';
            case 'TRANSFER_OUT':
            case 'WITHDRAW':
            case 'FEE':
              return 'blue';
            case 'FREEZE':
              return 'red';
            default:
              return 'default';
          }
        };

        const getTextByType = (type: string) => {
          switch (type) {
            case 'TRANSFER_IN':
              return '转入';
            case 'TRANSFER_OUT':
              return '转出';
            case 'DEPOSIT':
              return '充值';
            case 'WITHDRAW':
              return '提现';
            case 'FREEZE':
              return '冻结';
            case 'UNFREEZE':
              return '解冻';
            case 'FEE':
              return '手续费';
            default:
              return type;
          }
        };

        return (
          <Tag color={getColorByType(record.type)}>
            {getTextByType(record.type)}
          </Tag>
        );
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      valueType: 'money',
      sorter: (a, b) => a.amount - b.amount,
      render: (_, record) => {
        // 使用正负数显示不同颜色
        const style =
          record.amount > 0
            ? { color: '#52c41a' }
            : record.amount < 0
            ? { color: '#f5222d' }
            : {};
        return <span style={style}>{record.amount.toFixed(2)}</span>;
      },
    },
    {
      title: '余额',
      dataIndex: 'balance',
      valueType: 'money',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      valueEnum: {
        success: { text: '成功', status: 'Success' },
        pending: { text: '处理中', status: 'Warning' },
        failed: { text: '失败', status: 'Error' },
      },
      render: (_, record) => (
        <Tag color={statusMap[record.status].color}>
          {statusMap[record.status].text}
        </Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      search: false,
    },
    {
      title: '交易时间',
      dataIndex: 'transactionTime',
      valueType: 'dateTime',
      sorter: (a, b) =>
        new Date(a.transactionTime).getTime() - new Date(b.transactionTime).getTime(),
    },
    {
      title: '操作人',
      dataIndex: 'operatorId',
      filters: true,
      valueEnum: {
        USER001: { text: '张三' },
        USER002: { text: '李四' },
        USER004: { text: '智慧科技' },
        ADMIN001: { text: '管理员' },
        SYSTEM: { text: '系统' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 100,
      render: (_, record) => [
        <a
          key="details"
          onClick={() => {
            console.log('查看交易详情:', record.id);
          }}
        >
          详情
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<Transaction>
        headerTitle="账户流水"
        actionRef={actionRef}
        rowKey="id"
        scroll={{ x: 1300 }}
        search={{
          labelWidth: 120,
        }}
        request={getTransactions}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
        summary={(pageData) => {
          let totalIncome = 0;
          let totalOutcome = 0;

          pageData.forEach(({ amount }) => {
            if (amount > 0) {
              totalIncome += amount;
            } else {
              totalOutcome += Math.abs(amount);
            }
          });

          return (
            <>
              <ProTable.Summary.Row>
                <ProTable.Summary.Cell index={0} colSpan={4}>
                  总计
                </ProTable.Summary.Cell>
                <ProTable.Summary.Cell index={1}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>收入：</span>
                    <span style={{ color: '#52c41a' }}>¥{totalIncome.toFixed(2)}</span>
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>支出：</span>
                    <span style={{ color: '#f5222d' }}>¥{totalOutcome.toFixed(2)}</span>
                  </div>
                </ProTable.Summary.Cell>
                <ProTable.Summary.Cell index={2} colSpan={7}></ProTable.Summary.Cell>
              </ProTable.Summary.Row>
            </>
          );
        }}
      />
    </PageContainer>
  );
};

export default TransactionsPage;
