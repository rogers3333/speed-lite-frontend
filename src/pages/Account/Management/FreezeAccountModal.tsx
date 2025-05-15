import { Button, Modal, Radio } from 'antd';
import React, { useState } from 'react';

interface FreezeAccountModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (freezeType: string) => void;
}

const FreezeAccountModal: React.FC<FreezeAccountModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [freezeType, setFreezeType] = useState('normal');

  return (
    <Modal
      title="冻结账户"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
      destroyOnClose
    >
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 16, fontWeight: 500 }}>冻结类型</div>
        <Radio.Group
          onChange={(e) => setFreezeType(e.target.value)}
          value={freezeType}
        >
          <Radio value="normal">正常</Radio>
          <Radio value="inOnly">只进账不出账</Radio>
          <Radio value="outOnly">只出账不进账</Radio>
          <Radio value="none">不进账不出账</Radio>
        </Radio.Group>
        <Button
          type="primary"
          style={{ marginTop: 24 }}
          onClick={() => onSubmit(freezeType)}
        >
          提交
        </Button>
      </div>
    </Modal>
  );
};

export default FreezeAccountModal;
