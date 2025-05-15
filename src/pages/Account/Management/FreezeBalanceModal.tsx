import { Button, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';

interface FreezeBalanceModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (operationType: string, amount: number) => void;
}

const FreezeBalanceModal: React.FC<FreezeBalanceModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [operationType, setOperationType] = useState('freeze');
  const [amount, setAmount] = useState<number | undefined>(undefined);

  return (
    <Modal
      title="冻结余额"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
      destroyOnClose
    >
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 16, fontWeight: 500 }}>冻结类型</div>
        <Radio.Group
          onChange={(e) => setOperationType(e.target.value)}
          value={operationType}
        >
          <Radio value="freeze">冻结余额</Radio>
          <Radio value="unfreeze">解冻余额</Radio>
        </Radio.Group>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 8 }}>冻结数值</div>
          <Input
            type="number"
            placeholder="两位小数的正数"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            style={{ flex: 1 }}
          />
        </div>
        <Button
          type="primary"
          style={{
            marginTop: 24,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          onClick={() => onSubmit(operationType, amount || 0)}
        >
          提交
        </Button>
      </div>
    </Modal>
  );
};

export default FreezeBalanceModal;
