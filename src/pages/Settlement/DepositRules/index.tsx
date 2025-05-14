import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Dropdown, Form, Input, message, Modal, Radio, Select, Space, Flex } from 'antd';
import React, { useRef, useState } from 'react';

type DepositRule = {
  seqNo: number;
  ruleId: string;
  businessLine: string;
  feeCode: string;
  feeType: string;
  subjectIdType: string;
  incomeExpense: string;
  accountType: string;
  accountSubType: string;
  createTime: string;
  creator: string;
  status: string;
  operation: string;
};

// 枚举选项
const feeTypeOptions = [
  { label: '订单收入', value: '订单收入' },
  { label: '奖金', value: '奖金' },
  { label: '罚款', value: '罚款' },
  { label: '保证金充值', value: '保证金充值' },
];

const businessLineOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
];

const supervisoryChannelOptions = [
  { label: '微信', value: '微信' },
  { label: '平安银行', value: '平安银行' },
  { label: '光大银行', value: '光大银行' },
];

const incomeExpenseOptions = [
  { label: '收入', value: '收入' },
  { label: '支出', value: '支出' },
];

const entityOptions = [
  { label: '用户', value: '用户' },
  { label: '商家', value: '商家' },
  { label: '渠道商', value: '渠道商' },
  { label: '内部', value: '内部' },
];

const idTypeOptions = [
  { label: 'Bid', value: 'Bid' },
  { label: 'useID', value: 'useID' },
];

const accountTypeOptions = [
  { label: '结算账户', value: '结算账户' },
  { label: '保证金账户', value: '保证金账户' },
  { label: '营销账户', value: '营销账户' },
  { label: '补贴账户', value: '补贴账户' },
];

const accountSubTypeOptions = [
  { label: '服务收入账户', value: '服务收入账户' },
];

// 模拟数据
const getDepositRules = async () => {
  const rules: DepositRule[] = [
    {
      seqNo: 1,
      ruleId: '001',
      businessLine: 'A',
      feeCode: '101',
      feeType: '订单收入',
      subjectIdType: 'useID',
      incomeExpense: '收入',
      accountType: '结算账户',
      accountSubType: '服务收入账户',
      createTime: '2023.05.11 12:00:00',
      creator: '宇宙',
      status: '有效',
      operation: '编辑 冻结规则',
    },
    {
      seqNo: 2,
      ruleId: '002',
      businessLine: 'B',
      feeCode: '102',
      feeType: '奖金',
      subjectIdType: 'useID',
      incomeExpense: '收入',
      accountType: '结算账户',
      accountSubType: '服务收入账户',
      createTime: '2023.05.11 12:00:00',
      creator: '宇宙',
      status: '有效',
      operation: '编辑 冻结规则',
    },
    {
      seqNo: 3,
      ruleId: '003',
      businessLine: 'C',
      feeCode: '103',
      feeType: '罚款',
      subjectIdType: 'useID',
      incomeExpense: '支出',
      accountType: '结算账户',
      accountSubType: '服务收入账户',
      createTime: '2023.05.11 12:00:00',
      creator: '宇宙',
      status: '有效',
      operation: '编辑 冻结规则',
    },
  ];

  return {
    data: rules,
    total: rules.length,
    success: true,
  };
};

// 监管渠道下拉菜单项
const channelItems = [
  {
    key: '微信',
    label: '微信',
  },
  {
    key: '平安银行',
    label: '平安银行',
  },
  {
    key: '光大银行',
    label: '光大银行',
  },
];

const DepositRulesPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedFeeType, setSelectedFeeType] = useState<string>('订单收入');
  
  // 表单中选择的值
  const [formBusinessLine, setFormBusinessLine] = useState<string>('A');
  const [formFeeType, setFormFeeType] = useState<string>('订单收入');
  const [formChannel, setFormChannel] = useState<string>('请选择');
  const [formIncomeExpense, setFormIncomeExpense] = useState<string>('收入');
  const [formEntity, setFormEntity] = useState<string>('商家');
  const [formIdType, setFormIdType] = useState<string>('Bid');
  const [formAccountType, setFormAccountType] = useState<string>('结算账户');
  const [formAccountSubType, setFormAccountSubType] = useState<string>('服务收入账户');
  const [formIsEffective, setFormIsEffective] = useState<string>('是');

  const handleSearch = () => {
    actionRef.current?.reload();
  };

  const handleReset = () => {
    setSelectedFeeType('订单收入');
  };

  const handleAdd = () => {
    setAddModalVisible(true);
  };

  const handleCancel = () => {
    setAddModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      message.success('提交成功');
      setAddModalVisible(false);
      form.resetFields();
      actionRef.current?.reload();
    }).catch(errorInfo => {
      console.log('Validate Failed:', errorInfo);
    });
  };

  const handleEdit = (record: DepositRule) => {
    message.info(`编辑规则: ${record.ruleId}`);
  };

  const handleFreezeRule = (record: DepositRule) => {
    message.info(`配置冻结规则: ${record.ruleId}`);
  };

  const handleChannelSelect = ({ key }: { key: string }) => {
    setFormChannel(key);
    form.setFieldsValue({ channel: key });
  };

  const columns: ProColumns<DepositRule>[] = [
    {
      title: '序号',
      dataIndex: 'seqNo',
      width: 60,
    },
    {
      title: '规则ID',
      dataIndex: 'ruleId',
      width: 80,
    },
    {
      title: '业务线',
      dataIndex: 'businessLine',
      width: 80,
    },
    {
      title: '费用编码',
      dataIndex: 'feeCode',
      width: 80,
    },
    {
      title: '费用类型',
      dataIndex: 'feeType',
      width: 100,
    },
    {
      title: '主体编号类型',
      dataIndex: 'subjectIdType',
      width: 120,
    },
    {
      title: '收支',
      dataIndex: 'incomeExpense',
      width: 70,
      render: (text) => (
        <span style={{ color: text === '收入' ? '#52c41a' : '#f5222d' }}>
          {text}
        </span>
      ),
    },
    {
      title: '账户类型',
      dataIndex: 'accountType',
      width: 100,
    },
    {
      title: '账户子类型',
      dataIndex: 'accountSubType',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 160,
      render: (_, record) => (
        <Space>
          <a 
            style={{ color: '#1890ff' }} 
            onClick={() => handleEdit(record)}
          >
            编辑
          </a>
          <a 
            style={{ color: '#1890ff' }} 
            onClick={() => handleFreezeRule(record)}
          >
            冻结规则
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ backgroundColor: '#f5f5f5', padding: '10px 20px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>入账规则管理</h2>
      </div>

      <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>费用类型</div>
        <Select 
          style={{ width: '200px', marginRight: '20px' }} 
          value={selectedFeeType}
          onChange={(value) => setSelectedFeeType(value)}
          options={feeTypeOptions}
        />
        <Button 
          style={{ marginRight: '10px' }}
          onClick={handleReset}
        >
          重置
        </Button>
        <Button 
          type="primary"
          onClick={handleSearch}
        >
          查询
        </Button>
      </div>

      <Flex gap="small" style={{ marginBottom: '16px' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          新增
        </Button>
      </Flex>

      <ProTable<DepositRule>
        actionRef={actionRef}
        rowKey="ruleId"
        search={false}
        options={false}
        pagination={false}
        request={getDepositRules}
        columns={columns}
        scroll={{ x: 1300 }}
        bordered
        style={{ 
          backgroundColor: '#fff',
        }}
      />

      {/* 新增入账规则弹窗 */}
      <Modal
        title={<div style={{ backgroundColor: '#f5f5f5', padding: '10px 16px', margin: '-20px -24px 20px' }}>新增入账规则</div>}
        open={addModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: '#39bbdb', borderColor: '#39bbdb' }}
            onClick={handleSubmit}
          >
            提交
          </Button>,
        ]}
        width={600}
        bodyStyle={{ padding: '0 24px 24px' }}
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            businessLine: formBusinessLine,
            feeType: formFeeType,
            channel: formChannel,
            incomeExpense: formIncomeExpense,
            entity: formEntity,
            idType: formIdType,
            accountType: formAccountType,
            accountSubType: formAccountSubType,
            isEffective: formIsEffective,
          }}
        >
          <div style={{ backgroundColor: '#f5f5f5', padding: '10px 16px', marginBottom: 16 }}>
            <h3 style={{ margin: 0 }}>入账条件</h3>
          </div>

          <Form.Item
            label="业务线"
            name="businessLine"
            rules={[{ required: true, message: '请选择业务线' }]}
          >
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
              options={businessLineOptions}
              value={formBusinessLine}
              onChange={(value) => setFormBusinessLine(value)}
            />
          </Form.Item>

          <Form.Item
            label="费用类型"
            name="feeType"
            rules={[{ required: true, message: '请选择费用类型' }]}
          >
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
              options={feeTypeOptions}
              value={formFeeType}
              onChange={(value) => setFormFeeType(value)}
            />
          </Form.Item>

          <Form.Item
            label="监管渠道"
            name="channel"
          >
            <Dropdown
              menu={{
                items: channelItems,
                onClick: handleChannelSelect,
              }}
              trigger={['click']}
            >
              <Button style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{formChannel}</span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>

          <div style={{ backgroundColor: '#f5f5f5', padding: '10px 16px', marginBottom: 16, marginTop: 24 }}>
            <h3 style={{ margin: 0 }}>入账规则</h3>
          </div>

          <Form.Item
            label="收支方向"
            name="incomeExpense"
            rules={[{ required: true, message: '请选择收支方向' }]}
          >
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
              options={incomeExpenseOptions}
              value={formIncomeExpense}
              onChange={(value) => setFormIncomeExpense(value)}
            />
          </Form.Item>

          <Form.Item
            label="入账主体"
            name="entity"
            rules={[{ required: true, message: '请选择入账主体' }]}
          >
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
              options={entityOptions}
              value={formEntity}
              onChange={(value) => setFormEntity(value)}
            />
          </Form.Item>

          <Form.Item
            label="主体编号类型"
            name="idType"
            rules={[{ required: true, message: '请选择主体编号类型' }]}
          >
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
              options={idTypeOptions}
              value={formIdType}
              onChange={(value) => setFormIdType(value)}
            />
          </Form.Item>

          <Form.Item
            label="账户类型"
            name="accountType"
            rules={[{ required: true, message: '请选择账户类型' }]}
          >
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
              options={accountTypeOptions}
              value={formAccountType}
              onChange={(value) => setFormAccountType(value)}
            />
          </Form.Item>

          <Form.Item
            label="账户子类型"
            name="accountSubType"
            rules={[{ required: true, message: '请选择账户子类型' }]}
          >
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
              options={accountSubTypeOptions}
              value={formAccountSubType}
              onChange={(value) => setFormAccountSubType(value)}
            />
          </Form.Item>

          <Form.Item
            label="是否生效"
            name="isEffective"
          >
            <Radio.Group
              onChange={(e) => setFormIsEffective(e.target.value)}
              value={formIsEffective}
              optionType="button"
              buttonStyle="solid"
            >
              <Radio value="是">是</Radio>
              <Radio value="否">否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepositRulesPage; 