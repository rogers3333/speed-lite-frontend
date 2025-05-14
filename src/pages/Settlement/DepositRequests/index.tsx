import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

type DepositRequest = {
  requestId: string;
  businessNo: string;
  businessLine: string;
  userId: string;
  feeType: string;
  amount: number;
  income: string;
  isFrozen: string;
  freezeMethod: string;
  freezeRule: string;
  accountType: string;
  accountChildType: string;
  status: string;
  createdTime: string;
  flowDetails: string;
  remarks: string;
};

type StatusMapType = {
  [key: string]: { text: string; color: string };
};

const statusMap: StatusMapType = {
  '已入账': { text: '已入账', color: 'green' },
  '待入账': { text: '待入账', color: 'gold' },
  '入账失败': { text: '入账失败', color: 'red' },
};

const feeTypeOptions = [
  { label: '订单收入', value: '订单收入' },
  { label: '奖金', value: '奖金' },
  { label: '罚款', value: '罚款' },
  { label: '保证金充值', value: '保证金充值' },
];

// 模拟数据
const getDepositRequests = async (params: any) => {
  const requestData: DepositRequest[] = [
    {
      requestId: '111',
      businessNo: '1',
      businessLine: 'A',
      userId: '1000',
      feeType: '订单收入',
      amount: 1000.00,
      income: '收入',
      isFrozen: '否',
      freezeMethod: '-',
      freezeRule: '-',
      accountType: '结算账户',
      accountChildType: '服务收入户',
      status: '已入账',
      createdTime: '2023.05.11 12:00:00',
      flowDetails: '详情',
      remarks: '',
    },
    {
      requestId: '222',
      businessNo: '2',
      businessLine: 'B',
      userId: '1001',
      feeType: '罚款',
      amount: 500.00,
      income: '支出',
      isFrozen: '否',
      freezeMethod: '-',
      freezeRule: '-',
      accountType: '结算账户',
      accountChildType: '服务收入户',
      status: '已入账',
      createdTime: '2023.05.11 12:00:00',
      flowDetails: '详情',
      remarks: '',
    },
    {
      requestId: '333',
      businessNo: '3',
      businessLine: 'C',
      userId: '1002',
      feeType: '奖金',
      amount: 100.00,
      income: '收入',
      isFrozen: '是',
      freezeMethod: '固定时间',
      freezeRule: 'M+10',
      accountType: '结算账户',
      accountChildType: '服务收入户',
      status: '已入账',
      createdTime: '2023.05.11 12:00:00',
      flowDetails: '详情',
      remarks: '',
    },
  ];

  const { current = 1, pageSize = 10 } = params;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: requestData.slice(startIndex, endIndex),
    total: requestData.length,
    success: true,
  };
};

const DepositRequestsPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const handleSearch = () => {
    actionRef.current?.reload();
    message.success('查询成功');
  };

  const handleReset = () => {
    form.resetFields();
  };

  const columns: ProColumns<DepositRequest>[] = [
    {
      title: '请求ID',
      dataIndex: 'requestId',
      width: 90,
    },
    {
      title: '业务单号',
      dataIndex: 'businessNo',
      width: 90,
    },
    {
      title: '业务线',
      dataIndex: 'businessLine',
      width: 90,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      width: 90,
    },
    {
      title: '费用类型',
      dataIndex: 'feeType',
      width: 100,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      valueType: 'money',
      width: 100,
    },
    {
      title: '收支',
      dataIndex: 'income',
      width: 80,
      render: (text) => {
        return text === '收入' ? (
          <span style={{ color: '#52c41a' }}>收入</span>
        ) : (
          <span style={{ color: '#f5222d' }}>支出</span>
        );
      },
    },
    {
      title: '是否冻结',
      dataIndex: 'isFrozen',
      width: 90,
    },
    {
      title: '冻结模式',
      dataIndex: 'freezeMethod',
      width: 100,
    },
    {
      title: '冻结规则',
      dataIndex: 'freezeRule',
      width: 100,
    },
    {
      title: '账户类型',
      dataIndex: 'accountType',
      width: 100,
    },
    {
      title: '账户子类型',
      dataIndex: 'accountChildType',
      width: 120,
    },
    {
      title: '入账状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => (
        <Tag color={statusMap[record.status]?.color || 'default'}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: 180,
    },
    {
      title: '流转详情',
      dataIndex: 'flowDetails',
      width: 90,
      render: (_, record) => (
        <a
          onClick={() => {
            message.info(`查看流转详情: ${record.requestId}`);
          }}
        >
          详情
        </a>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 120,
    },
  ];

  return (
    <PageContainer title="入账请求管理">
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Form form={form} layout="horizontal">
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="业务单号" name="businessNo">
                <Input placeholder="请输入业务单号" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="用户ID" name="userId">
                <Input placeholder="请输入ID" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="费用类型" name="feeType">
                <Select placeholder="请选择">
                  {feeTypeOptions.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="入账状态" name="status">
                <Select placeholder="请选择">
                  <Select.Option value="已入账">已入账</Select.Option>
                  <Select.Option value="待入账">待入账</Select.Option>
                  <Select.Option value="入账失败">入账失败</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="发生时间" name="timeRange">
                <DatePicker.RangePicker
                  placeholder={['开始时间', '结束时间']}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Space>
                  <Button type="primary" onClick={handleSearch}>
                    查询
                  </Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <ProTable<DepositRequest>
        headerTitle="入账请求列表"
        actionRef={actionRef}
        rowKey="requestId"
        search={false}
        options={false}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              message.success('新建入账请求');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={getDepositRequests}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        scroll={{ x: 1800 }}
      />
    </PageContainer>
  );
};

export default DepositRequestsPage; 