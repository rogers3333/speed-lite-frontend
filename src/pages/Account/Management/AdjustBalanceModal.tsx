import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
} from 'antd'; // 导入 Row 和 Col
import React, { useState } from 'react';

interface AccountInfo {
  id: string;
  type: string;
  subType: string;
  status: string;
  balance: number;
  frozenAmount: number;
  availableAmount: number;
}

const AdjustBalanceModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  account: AccountInfo | null;
}> = ({ visible, onCancel, account }) => {
  const [adjustType, setAdjustType] = useState('101');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(null);
  const [remark, setRemark] = useState('');

  const handleSubmit = () => {
    if (!account) {
      message.error('账户信息缺失');
      return;
    }

    if (!amount || !month || !remark) {
      message.error('请填写所有必填项');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0 || !/^\d+\.?\d{0,2}$/.test(amount)) {
      message.error('请输入有效的金额（正数，最多两位小数）');
      return;
    }

    message.success('调账成功');
    onCancel();
  };

  return (
    <Modal title="调账" visible={visible} onCancel={onCancel} footer={null}>
      <Form layout="vertical">
        <Form.Item label="账户信息">
          {account ? (
            <div>
              <Row>
                <Col span={12}>账户 ID: {account.id}</Col>
                <Col span={12}>账户类型: {account.type}</Col>
              </Row>
              <Row>
                <Col span={12}>账户子类型: {account.subType}</Col>
                <Col span={12}>账户状态: {account.status}</Col>
              </Row>
              <Row>
                <Col span={12}>余额: {account.balance}</Col>
                <Col span={12}>冻结余额: {account.frozenAmount}</Col>
              </Row>
              <Row>
                <Col span={12}>可用余额: {account.availableAmount}</Col>
              </Row>
            </div>
          ) : (
            <div>无账户信息</div>
          )}
        </Form.Item>
        <Form.Item label="调账费用类型" required>
          <Radio.Group
            onChange={(e) => setAdjustType(e.target.value)}
            value={adjustType}
          >
            <Radio value="101">余额调增</Radio>
            <Radio value="102">余额调减</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="调账金额" required>
          <Input
            placeholder="请输入金额（示例：1234.56）"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="总账月份" required>
          <DatePicker onChange={(date) => setMonth(date)} />
        </Form.Item>
        <Form.Item label="备注" required>
          <Input.TextArea
            placeholder="(0/100)"
            maxLength={100}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdjustBalanceModal;
