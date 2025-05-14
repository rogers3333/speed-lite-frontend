import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Dropdown, Form, Input, message, Modal, Radio, Select, Space, Flex, Col, Row, Checkbox, Divider, InputNumber, Tabs } from 'antd';
import React, { useRef, useState } from 'react';

// 增强的冻结规则类型，支持一记多模式
type FreezeRule = {
  seqNo: number;
  ruleId: string;
  businessLine: string;
  feeCode: string;
  feeType: string;
  freezeMode: string;
  freezeRule: string;
  isFreezed: string;
  accountTypes: string[];        // 适用账户类型
  freezeScope: 'ALL' | 'PARTIAL'; // 冻结范围
  priority: number;              // 规则优先级
  createTime: string;
  creator: string;
  effectiveDate: string;
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

const freezeModeOptions = [
  { label: '固定时长', value: '固定时长' },
  { label: '固定时间', value: '固定时间' },
];

const businessLineOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
];

// 账户类型选项
const accountTypeOptions = [
  { label: '结算账户', value: '结算账户' },
  { label: '保证金账户', value: '保证金账户' },
  { label: '营销账户', value: '营销账户' },
  { label: '补贴账户', value: '补贴账户' },
];

// 账户子类型选项
const accountSubTypeOptions = [
  { label: '服务收入账户', value: '服务收入账户' },
  { label: '平台佣金账户', value: '平台佣金账户' },
  { label: '商家营销账户', value: '商家营销账户' },
];

// 冻结范围选项
const freezeScopeOptions = [
  { label: '全部关联账户', value: 'ALL' },
  { label: '仅选定账户类型', value: 'PARTIAL' },
];

// 优先级选项
const priorityOptions = [
  { label: '高', value: 1 },
  { label: '中', value: 2 },
  { label: '低', value: 3 },
];

// 模拟数据
const getFreezeRules = async () => {
  const rules: FreezeRule[] = [
    {
      seqNo: 1,
      ruleId: '001',
      businessLine: 'A',
      feeCode: '101',
      feeType: '订单收入',
      freezeMode: '固定时间',
      freezeRule: 'M+1, 10号',
      isFreezed: '是',
      accountTypes: ['结算账户', '营销账户'],
      freezeScope: 'PARTIAL',
      priority: 1,
      createTime: '2023.05.11 12:00:00',
      creator: '宇宙',
      effectiveDate: '2023.05.11 12:00:00-2023.05.11 12:00:00',
      status: '有效',
      operation: '编辑',
    },
    {
      seqNo: 2,
      ruleId: '002',
      businessLine: 'B',
      feeCode: '102',
      feeType: '奖金',
      freezeMode: '固定时长',
      freezeRule: '7天',
      isFreezed: '是',
      accountTypes: ['结算账户'],
      freezeScope: 'ALL',
      priority: 2,
      createTime: '2023.05.11 12:00:00',
      creator: '宇宙',
      effectiveDate: '2023.05.11 12:00:00-2023.05.11 12:00:00',
      status: '有效',
      operation: '编辑',
    },
    {
      seqNo: 3,
      ruleId: '003',
      businessLine: 'C',
      feeCode: '103',
      feeType: '罚款',
      freezeMode: '--',
      freezeRule: '--',
      isFreezed: '否',
      accountTypes: [],
      freezeScope: 'ALL',
      priority: 3,
      createTime: '2023.05.11 12:00:00',
      creator: '宇宙',
      effectiveDate: '2023.05.11 12:00:00-2023.05.11 12:00:00',
      status: '有效',
      operation: '编辑',
    },
  ];

  return {
    data: rules,
    total: rules.length,
    success: true,
  };
};

const FreezeRulesPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedFeeType, setSelectedFeeType] = useState<string>('订单收入');
  const [selectedFreezeMode, setSelectedFreezeMode] = useState<string>('请选择');
  const [ruleIdInput, setRuleIdInput] = useState<string>('');
  
  // 表单中选择的值
  const [formBusinessLine, setFormBusinessLine] = useState<string>('A');
  const [formFeeType, setFormFeeType] = useState<string>('订单收入');
  const [formFreezeMode, setFormFreezeMode] = useState<string>('固定时间');
  const [formIsFreezed, setFormIsFreezed] = useState<string>('是');
  const [formIsEffective, setFormIsEffective] = useState<string>('是');
  const [formLongTermEffect, setFormLongTermEffect] = useState<boolean>(true);
  const [formYearValue, setFormYearValue] = useState<string>('无');
  const [formMonthValue, setFormMonthValue] = useState<string>('M+1');
  const [formDayValue, setFormDayValue] = useState<string>('10');
  const [formFreezeDuration, setFormFreezeDuration] = useState<string>('');
  const [formDurationUnit, setFormDurationUnit] = useState<string>('天');
  const [formAccountTypes, setFormAccountTypes] = useState<string[]>(['结算账户']);
  const [formAccountSubTypes, setFormAccountSubTypes] = useState<string[]>(['服务收入账户']);
  const [formFreezeScope, setFormFreezeScope] = useState<'ALL' | 'PARTIAL'>('ALL');
  const [formPriority, setFormPriority] = useState<number>(2);
  const [activeTab, setActiveTab] = useState<string>('basic');

  const handleSearch = () => {
    actionRef.current?.reload();
    message.success('查询成功');
  };

  const handleReset = () => {
    setSelectedFeeType('订单收入');
    setSelectedFreezeMode('请选择');
    setRuleIdInput('');
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

  const handleEdit = (record: FreezeRule) => {
    message.info(`编辑规则: ${record.ruleId}`);
  };

  const columns: ProColumns<FreezeRule>[] = [
    {
      title: '序号',
      dataIndex: 'seqNo',
      width: 60,
    },
    {
      title: '入账规则ID',
      dataIndex: 'ruleId',
      width: 100,
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
      title: '冻结模式',
      dataIndex: 'freezeMode',
      width: 100,
    },
    {
      title: '冻结规则',
      dataIndex: 'freezeRule',
      width: 100,
    },
    {
      title: '是否冻结',
      dataIndex: 'isFreezed',
      width: 80,
    },
    {
      title: '适用账户类型',
      dataIndex: 'accountTypes',
      width: 150,
      render: (_, record) => record.accountTypes.join(', ') || '--',
    },
    {
      title: '冻结范围',
      dataIndex: 'freezeScope',
      width: 100,
      render: (_, record) => record.freezeScope === 'ALL' ? '全部账户' : '部分账户',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      width: 80,
      render: (_, record) => {
        if (record.priority === 1) return <span style={{ color: 'red' }}>高</span>;
        if (record.priority === 2) return <span style={{ color: 'orange' }}>中</span>;
        return <span style={{ color: 'green' }}>低</span>;
      },
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
      title: '有效期',
      dataIndex: 'effectiveDate',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 80,
      render: (_, record) => (
        <a 
          style={{ color: '#1890ff' }} 
          onClick={() => handleEdit(record)}
        >
          编辑
        </a>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ backgroundColor: '#f5f5f5', padding: '10px 20px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>冻结规则管理</h2>
      </div>

      <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>费用类型</div>
          <Select 
            style={{ width: '200px' }} 
            value={selectedFeeType}
            onChange={(value) => setSelectedFeeType(value)}
            options={feeTypeOptions}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>冻结模式</div>
          <Select 
            style={{ width: '200px' }} 
            value={selectedFreezeMode}
            onChange={(value) => setSelectedFreezeMode(value)}
            options={[
              { label: '请选择', value: '请选择' },
              ...freezeModeOptions
            ]}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>入账规则ID</div>
          <Input 
            style={{ width: '200px' }} 
            value={ruleIdInput}
            onChange={(e) => setRuleIdInput(e.target.value)}
            placeholder="请输入业务编号"
          />
        </div>
        
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

      <ProTable<FreezeRule>
        actionRef={actionRef}
        rowKey="ruleId"
        search={false}
        options={false}
        pagination={false}
        request={getFreezeRules}
        columns={columns}
        scroll={{ x: 1600 }}
        bordered
        style={{ 
          backgroundColor: '#fff',
        }}
      />

      {/* 增强的新增冻结规则弹窗 */}
      <Modal
        title={<div style={{ backgroundColor: '#f5f5f5', padding: '10px 16px', margin: '-20px -24px 20px' }}>新增冻结规则</div>}
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
        width={700}
        bodyStyle={{ padding: '0 24px 24px' }}
        destroyOnClose={true}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'basic',
              label: '基本信息',
              children: (
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    businessLine: formBusinessLine,
                    feeType: formFeeType,
                    freezeMode: formFreezeMode,
                    isFreezed: formIsFreezed,
                    yearValue: formYearValue,
                    monthValue: formMonthValue,
                    dayValue: formDayValue,
                    freezeDuration: formFreezeDuration,
                    durationUnit: formDurationUnit,
                    isEffective: formIsEffective,
                    longTermEffect: formLongTermEffect,
                    accountTypes: formAccountTypes,
                    accountSubTypes: formAccountSubTypes,
                    freezeScope: formFreezeScope,
                    priority: formPriority,
                  }}
                >
                  <div style={{ backgroundColor: '#f5f5f5', padding: '10px 16px', marginBottom: 16 }}>
                    <h3 style={{ margin: 0 }}>入账条件</h3>
                  </div>

                  <Form.Item
                    label="入账规则ID"
                    name="depositRuleId"
                  >
                    <Input placeholder="入账ID" />
                  </Form.Item>

                  <div style={{ backgroundColor: '#f5f5f5', padding: '10px 16px', marginBottom: 16, marginTop: 24 }}>
                    <h3 style={{ margin: 0 }}>冻结规则</h3>
                  </div>

                  <Form.Item
                    label="是否冻结"
                    name="isFreezed"
                  >
                    <Radio.Group
                      onChange={(e) => setFormIsFreezed(e.target.value)}
                      value={formIsFreezed}
                    >
                      <Radio value="是">是</Radio>
                      <Radio value="否">否</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {formIsFreezed === '是' && (
                    <>
                      <Form.Item
                        label="冻结模式"
                        name="freezeMode"
                      >
                        <Select
                          style={{ width: '100%' }}
                          options={freezeModeOptions}
                          value={formFreezeMode}
                          onChange={(value) => setFormFreezeMode(value)}
                        />
                      </Form.Item>

                      {formFreezeMode === '固定时间' && (
                        <Form.Item
                          label="冻结时间"
                          name="freezeTime"
                        >
                          <Flex align="center" gap="small">
                            <Select 
                              style={{ width: 100 }} 
                              value={formYearValue}
                              onChange={(value) => setFormYearValue(value)}
                              options={[
                                { label: '无', value: '无' },
                                { label: 'Y+1', value: 'Y+1' },
                                { label: 'Y+2', value: 'Y+2' },
                              ]}
                            />
                            <span>年</span>
                            <Select 
                              style={{ width: 100 }} 
                              value={formMonthValue}
                              onChange={(value) => setFormMonthValue(value)}
                              options={[
                                { label: 'M+1', value: 'M+1' },
                                { label: 'M+2', value: 'M+2' },
                                { label: 'M+3', value: 'M+3' },
                              ]}
                            />
                            <span>月</span>
                            <Select 
                              style={{ width: 100 }} 
                              value={formDayValue}
                              onChange={(value) => setFormDayValue(value)}
                              options={[
                                { label: '10', value: '10' },
                                { label: '15', value: '15' },
                                { label: '20', value: '20' },
                                { label: '25', value: '25' },
                                { label: '30', value: '30' },
                              ]}
                            />
                            <span>日</span>
                          </Flex>
                        </Form.Item>
                      )}

                      {formFreezeMode === '固定时长' && (
                        <Form.Item
                          label="冻结时间"
                          name="freezeDuration"
                        >
                          <Flex align="center" gap="small">
                            <Input 
                              placeholder="输入整数数值" 
                              style={{ width: 280 }}
                              value={formFreezeDuration}
                              onChange={(e) => setFormFreezeDuration(e.target.value)}
                            />
                            <Select
                              style={{ width: 80 }}
                              value={formDurationUnit}
                              onChange={(value) => setFormDurationUnit(value)}
                              options={[
                                { label: '天', value: '天' }
                              ]}
                            />
                          </Flex>
                        </Form.Item>
                      )}

                      {/* 新增的适用账户类型选择 */}
                      <Form.Item
                        label="冻结范围"
                        name="freezeScope"
                      >
                        <Select
                          style={{ width: '100%' }}
                          options={freezeScopeOptions}
                          value={formFreezeScope}
                          onChange={(value) => setFormFreezeScope(value)}
                        />
                      </Form.Item>

                      {formFreezeScope === 'PARTIAL' && (
                        <>
                          <Form.Item
                            label="适用账户类型"
                            name="accountTypes"
                          >
                            <Checkbox.Group
                              options={accountTypeOptions}
                              value={formAccountTypes}
                              onChange={(values) => setFormAccountTypes(values as string[])}
                            />
                          </Form.Item>

                          <Form.Item
                            label="账户子类型"
                            name="accountSubTypes"
                          >
                            <Checkbox.Group
                              options={accountSubTypeOptions}
                              value={formAccountSubTypes}
                              onChange={(values) => setFormAccountSubTypes(values as string[])}
                            />
                          </Form.Item>
                        </>
                      )}
                      
                      {/* 优先级设置 */}
                      <Form.Item
                        label="规则优先级"
                        name="priority"
                        tooltip="当多个冻结规则同时适用时，优先级高的规则将被优先执行"
                      >
                        <Select
                          style={{ width: '100%' }}
                          options={priorityOptions}
                          value={formPriority}
                          onChange={(value) => setFormPriority(value)}
                        />
                      </Form.Item>
                    </>
                  )}

                  <Form.Item
                    label="有效期"
                    name="effectivePeriod"
                  >
                    <Flex align="center" gap="middle">
                      <Flex align="center" style={{ flex: 1 }}>
                        <Form.Item name="startDate" noStyle>
                          <Input placeholder="开始时间" style={{ width: '100%' }} />
                        </Form.Item>
                      </Flex>
                      <Flex align="center" style={{ flex: 1 }}>
                        <Form.Item name="endDate" noStyle>
                          <Input placeholder="结束时间" style={{ width: '100%' }} />
                        </Form.Item>
                      </Flex>
                      <Form.Item name="longTermEffect" noStyle valuePropName="checked">
                        <Radio
                          checked={formLongTermEffect}
                          onChange={(e) => setFormLongTermEffect(e.target.checked)}
                        >
                          长期有效
                        </Radio>
                      </Form.Item>
                    </Flex>
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
              ),
            },
            {
              key: 'advanced',
              label: '高级设置',
              children: (
                <Form layout="vertical">
                  <div style={{ backgroundColor: '#f5f5f5', padding: '10px 16px', marginBottom: 16 }}>
                    <h3 style={{ margin: 0 }}>触发条件设置</h3>
                  </div>
                  
                  <Form.Item label="金额阈值" name="amountThreshold">
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="当单笔交易金额超过此值时触发冻结"
                      addonBefore="¥"
                    />
                  </Form.Item>
                  
                  <Form.Item label="交易次数阈值" name="countThreshold">
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="当账户交易次数超过此值时触发冻结"
                      addonAfter="笔"
                    />
                  </Form.Item>
                  
                  <Divider />
                  
                  <div style={{ backgroundColor: '#f5f5f5', padding: '10px 16px', marginBottom: 16 }}>
                    <h3 style={{ margin: 0 }}>解冻策略设置</h3>
                  </div>
                  
                  <Form.Item label="解冻策略" name="unfreezeStrategy">
                    <Radio.Group>
                      <Radio value="ALL">所有账户同时解冻</Radio>
                      <Radio value="SEQUENCE">按顺序解冻</Radio>
                    </Radio.Group>
                  </Form.Item>
                  
                  <Form.Item 
                    label="账户解冻顺序"
                    name="unfreezeSequence"
                    extra="拖拽调整账户类型的解冻优先级，排在前面的账户将优先解冻"
                  >
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="请选择账户解冻顺序"
                      options={accountTypeOptions}
                    />
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default FreezeRulesPage; 