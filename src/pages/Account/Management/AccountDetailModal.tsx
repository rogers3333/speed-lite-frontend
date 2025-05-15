import { Descriptions, Modal, Tag } from 'antd';
import React from 'react';

interface AccountDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  account: {
    id: string;
    type: 'SETTLEMENT' | 'SERVICE_INCOME';
    subType: string;
    status: 'active' | 'frozen' | 'suspended' | 'closed';
    balance: number;
    frozenAmount: number;
    availableAmount: number;
    userType: string;
    name: string;
    businessLine: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

const statusMap = {
  active: { text: '正常', color: 'green' },
  frozen: { text: '冻结', color: 'red' },
  suspended: { text: '暂停', color: 'orange' },
  closed: { text: '关闭', color: 'default' },
};

const typeMap = {
  SETTLEMENT: '结算账户',
  SERVICE_INCOME: '服务收入账户',
};

const AccountDetailModal: React.FC<AccountDetailModalProps> = ({
  visible,
  onCancel,
  account,
}) => {
  return (
    <Modal
      title="账户详情"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      destroyOnClose
    >
      {account && (
        <div
          style={{
            background: '#fff',
            padding: 24,
            borderRadius: 10,
            boxShadow: '0 2px 8px #f0f1f2',
            minHeight: 260,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: '#222',
              marginBottom: 18,
              letterSpacing: 1,
            }}
          >
            账户基础信息
          </div>
          <Descriptions
            column={2}
            bordered
            size="middle"
            labelStyle={{
              width: 120,
              fontWeight: 500,
              background: '#fafbfc',
              color: '#555',
              fontSize: 15,
            }}
            contentStyle={{
              fontWeight: 400,
              fontSize: 15,
              color: '#222',
              background: '#fff',
            }}
            style={{ marginBottom: 24 }}
          >
            <Descriptions.Item label="账户ID">{account.id}</Descriptions.Item>
            <Descriptions.Item label="开户人ID">{account.id}</Descriptions.Item>
          </Descriptions>
          <Descriptions
            column={1}
            bordered
            size="middle"
            labelStyle={{
              width: 120,
              fontWeight: 500,
              background: '#fafbfc',
              color: '#555',
              fontSize: 15,
            }}
            contentStyle={{
              fontWeight: 400,
              fontSize: 15,
              color: '#222',
              background: '#fff',
            }}
            style={{ marginBottom: 24 }}
          >
            <Descriptions.Item label="账户类型">
              {typeMap[account.type]}
            </Descriptions.Item>
            <Descriptions.Item label="账户子类型">
              {account.subType}
            </Descriptions.Item>
            <Descriptions.Item label="账户状态">
              <Tag
                color={statusMap[account.status].color}
                style={{ fontWeight: 600, fontSize: 15, padding: '2px 12px' }}
              >
                {statusMap[account.status].text}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            column={1}
            bordered
            size="middle"
            labelStyle={{
              width: 120,
              fontWeight: 500,
              background: '#fafbfc',
              color: '#555',
              fontSize: 15,
            }}
            contentStyle={{
              fontWeight: 400,
              fontSize: 15,
              color: '#222',
              background: '#fff',
            }}
            style={{ marginBottom: 24 }}
          >
            <Descriptions.Item label="余额">
              <span style={{ color: '#1a7f37', fontWeight: 700, fontSize: 17 }}>
                {account.balance.toFixed(2)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="冻结余额">
              <span style={{ color: '#d4380d', fontWeight: 700, fontSize: 17 }}>
                {account.frozenAmount.toFixed(2)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="可用余额">
              <span style={{ color: '#1890ff', fontWeight: 700, fontSize: 17 }}>
                {account.availableAmount.toFixed(2)}
              </span>
            </Descriptions.Item>
          </Descriptions>
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: '#222',
              marginBottom: 18,
              letterSpacing: 1,
            }}
          >
            其他信息
          </div>
          <Descriptions
            column={2}
            bordered
            size="middle"
            labelStyle={{
              width: 120,
              fontWeight: 500,
              background: '#fafbfc',
              color: '#555',
              fontSize: 15,
            }}
            contentStyle={{
              fontWeight: 400,
              fontSize: 15,
              color: '#222',
              background: '#fff',
            }}
          >
            <Descriptions.Item label="创建时间">
              {account.createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {account.updatedAt}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Modal>
  );
};

export default AccountDetailModal;
