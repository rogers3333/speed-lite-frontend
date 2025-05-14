import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React from 'react';

const { Statistic } = StatisticCard;

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <ProCard>
            <Statistic title="总账户数" value={1543} suffix="个" />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <ProCard>
            <Statistic title="今日入账请求" value={128} suffix="笔" />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <ProCard>
            <Statistic title="今日入账金额" value={49385.32} prefix="￥" precision={2} />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <ProCard>
            <Statistic title="冻结账户" value={5} suffix="个" />
          </ProCard>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <ProCard title="系统概况" headerBordered>
            <div style={{ padding: '20px 0' }}>
              <p>欢迎使用支付结算系统，您可以：</p>
              <ul>
                <li>在【结算管理】中处理入账请求、管理费用类型、设置入账规则和冻结规则</li>
                <li>在【账户管理】中查看账户详情、账户流水和操作记录</li>
              </ul>
              <p>系统运行状态良好，最近一次数据同步时间：2023-08-01 08:30:45</p>
            </div>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard; 