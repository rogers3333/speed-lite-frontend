import {
  ActionType,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Input, Select, Space, Row, Col, Form } from 'antd';
import React, { useRef, useState } from 'react';
import '../../../global.less';

type OperationRecord = {
  id: number;
  userId: string;
  businessLine: string;
  accountId: string;
  accountSubType: string;
  operationType: string;
  operationSubType: string;
  remark: string;
  createTime: string;
  operator: string;
};

// 操作类型选项
const operationTypeOptions = [
  { label: '请选择', value: '' },
  { label: '冻结账户', value: '冻结账户' },
  { label: '冻结余额', value: '冻结余额' },
  { label: '调账', value: '调账' },
  { label: '操作流水', value: '操作流水' },
];

// 模拟数据
const getOperationRecords = async () => {
  const records: OperationRecord[] = [
    {
      id: 1,
      userId: '1000',
      businessLine: 'A',
      accountId: '12121',
      accountSubType: '服务收入账户',
      operationType: '冻结账户',
      operationSubType: '冻结',
      remark: '客诉已处理',
      createTime: '2023.05.11 12:00:00',
      operator: '宇宙',
    },
    {
      id: 2,
      userId: '1001',
      businessLine: 'B',
      accountId: '23232',
      accountSubType: '服务收入账户',
      operationType: '冻结账户',
      operationSubType: '冻结',
      remark: '归还设备',
      createTime: '2023.05.11 12:00:00',
      operator: '宇宙',
    },
    {
      id: 3,
      userId: '1002',
      businessLine: 'C',
      accountId: '43435',
      accountSubType: '服务收入账户',
      operationType: '冻结余额',
      operationSubType: '300.00',
      remark: '发生客诉',
      createTime: '2023.05.11 12:00:00',
      operator: '宇宙',
    },
  ];

  return {
    data: records,
    total: records.length,
    success: true,
  };
};

const OperationRecordsPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  
  // 表单状态
  const [userId, setUserId] = useState<string>('');
  const [accountId, setAccountId] = useState<string>('');
  const [operationType, setOperationType] = useState<string>('');

  const handleSearch = () => {
    actionRef.current?.reload();
  };

  const handleReset = () => {
    setUserId('');
    setAccountId('');
    setOperationType('');
  };

  const columns: ProColumns<OperationRecord>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: '用户 ID',
      dataIndex: 'userId',
      width: 100,
      align: 'center',
    },
    {
      title: '业务线',
      dataIndex: 'businessLine',
      width: 80,
      align: 'center',
    },
    {
      title: '账户 ID',
      dataIndex: 'accountId',
      width: 100,
      align: 'center',
    },
    {
      title: '账户子类型',
      dataIndex: 'accountSubType',
      width: 120,
      align: 'center',
    },
    {
      title: '操作类型',
      dataIndex: 'operationType',
      width: 100,
      align: 'center',
    },
    {
      title: '操作子类型',
      dataIndex: 'operationSubType',
      width: 100,
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 140,
      align: 'center',
    },
    {
      title: '发生时间',
      dataIndex: 'createTime',
      width: 160,
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      width: 100,
      align: 'center',
    },
  ];

  return (
    <div className="page-container">
      <div style={{ backgroundColor: '#f0f0f0', padding: '12px 16px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '16px' }}>操作记录</h2>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={6}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '65px', textAlign: 'right', marginRight: '8px' }}>用户 ID</span>
              <Input 
                placeholder="请输入 ID" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{ flex: 1 }}
              />
            </div>
          </Col>
          <Col span={6}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '65px', textAlign: 'right', marginRight: '8px' }}>账户 ID</span>
              <Input 
                placeholder="请输入 ID" 
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                style={{ flex: 1 }}
              />
            </div>
          </Col>
          <Col span={6}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '65px', textAlign: 'right', marginRight: '8px' }}>操作类型</span>
              <Select
                placeholder="请选择"
                value={operationType || undefined}
                onChange={(value) => setOperationType(value)}
                options={operationTypeOptions}
                style={{ flex: 1 }}
              />
            </div>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Space size="middle">
              <Button onClick={handleReset} style={{ width: '80px' }}>
                重置
              </Button>
              <Button type="primary" onClick={handleSearch} style={{ width: '80px' }}>
                查询
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <ProTable<OperationRecord>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        options={false}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
        request={getOperationRecords}
        columns={columns}
        bordered
        scroll={{ x: 1100 }}
        className="table-card"
        rowClassName={() => 'ant-table-row-custom'}
      />
    </div>
  );
};

export default OperationRecordsPage; 