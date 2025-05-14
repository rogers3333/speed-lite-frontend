import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, message, Row, Select, Space, Switch, Tag } from 'antd';
import React, { useRef, useState } from 'react';

type FeeType = {
  feeCode: string;
  feeName: string;
  createTime: string;
  creator: string;
  description: string;
  operation: string;
};

// 费用类型选项
const feeTypeOptions = [
  { label: '订单收入', value: '订单收入' },
  { label: '奖金', value: '奖金' },
  { label: '罚款', value: '罚款' },
  { label: '保证金充值', value: '保证金充值' },
];

// 模拟数据
const getFeeTypes = async (params: any) => {
  const feeTypes: FeeType[] = [
    {
      feeCode: '101',
      feeName: '订单收入',
      createTime: '2023.05.11 12：00：00',
      creator: '宇宙',
      description: '订单的结算收入',
      operation: '设置入账规则',
    },
    {
      feeCode: '102',
      feeName: '奖金',
      createTime: '2023.05.11 12：00：00',
      creator: '宇宙',
      description: '奖金',
      operation: '设置入账规则',
    },
    {
      feeCode: '103',
      feeName: '罚款',
      createTime: '2023.05.11 12：00：00',
      creator: '宇宙',
      description: '罚款',
      operation: '设置入账规则',
    },
  ];

  const { current = 1, pageSize = 10 } = params;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: feeTypes.slice(startIndex, endIndex),
    total: feeTypes.length,
    success: true,
  };
};

const FeeTypesPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [selectedFeeType, setSelectedFeeType] = useState<string>('订单收入');

  const handleSearch = () => {
    actionRef.current?.reload();
    message.success('查询成功');
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleAdd = () => {
    message.success('新增费用类型');
  };

  const handleSetRule = (record: FeeType) => {
    message.success(`设置 ${record.feeName} 的入账规则`);
  };

  const columns: ProColumns<FeeType>[] = [
    {
      title: '费用编码',
      dataIndex: 'feeCode',
      width: 100,
    },
    {
      title: '费用类型',
      dataIndex: 'feeName',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      width: 100,
    },
    {
      title: '说明',
      dataIndex: 'description',
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 120,
      render: (_, record) => (
        <a 
          style={{ color: '#1890ff' }}
          onClick={() => handleSetRule(record)}
        >
          设置入账规则
        </a>
      ),
    },
  ];

  return (
    <PageContainer title="费用类型管理">
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Form 
          form={form} 
          layout="inline"
          style={{ marginBottom: 16 }}
        >
          <Form.Item label="费用类型" name="feeType">
            <Select 
              style={{ width: 200 }} 
              value={selectedFeeType}
              onChange={(value) => setSelectedFeeType(value)}
              options={feeTypeOptions}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={handleReset}>重置</Button>
              <Button type="primary" onClick={handleSearch}>
                查询
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          <PlusOutlined /> 新增
        </Button>
      </div>

      <ProTable<FeeType>
        actionRef={actionRef}
        rowKey="feeCode"
        search={false}
        options={false}
        pagination={{
          pageSize: 10,
        }}
        request={getFeeTypes}
        columns={columns}
      />
    </PageContainer>
  );
};

export default FeeTypesPage; 