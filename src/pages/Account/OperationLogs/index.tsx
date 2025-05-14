import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Badge, Tooltip } from 'antd';
import React, { useRef } from 'react';

type OperationLog = {
  id: string;
  userId: string;
  userName: string;
  ip: string;
  action: string;
  actionType: 'query' | 'create' | 'update' | 'delete' | 'import' | 'export' | 'login' | 'logout';
  module: string;
  detail: string;
  status: 'success' | 'failure';
  createTime: string;
};

// 模拟数据
const getOperationLogs = async (params: any) => {
  const logs: OperationLog[] = [
    {
      id: 'LOG100001',
      userId: 'ADMIN001',
      userName: '管理员',
      ip: '192.168.1.100',
      action: '冻结账户',
      actionType: 'update',
      module: '账户管理',
      detail: '冻结账户: ACC100003',
      status: 'success',
      createTime: '2023-07-30 09:40:00',
    },
    {
      id: 'LOG100002',
      userId: 'USER001',
      userName: '张三',
      ip: '192.168.1.101',
      action: '转账',
      actionType: 'create',
      module: '交易管理',
      detail: '向李四转账1000元',
      status: 'success',
      createTime: '2023-07-31 15:20:30',
    },
    {
      id: 'LOG100003',
      userId: 'USER001',
      userName: '张三',
      ip: '192.168.1.101',
      action: '提现',
      actionType: 'create',
      module: '交易管理',
      detail: '提现500元到银行卡',
      status: 'success',
      createTime: '2023-07-30 10:30:15',
    },
    {
      id: 'LOG100004',
      userId: 'USER002',
      userName: '李四',
      ip: '192.168.1.102',
      action: '提现',
      actionType: 'create',
      module: '交易管理',
      detail: '提现1000元到银行卡',
      status: 'failure',
      createTime: '2023-07-31 16:45:00',
    },
    {
      id: 'LOG100005',
      userId: 'ADMIN001',
      userName: '管理员',
      ip: '192.168.1.100',
      action: '查询账户',
      actionType: 'query',
      module: '账户管理',
      detail: '查询所有冻结账户',
      status: 'success',
      createTime: '2023-07-31 14:20:00',
    },
    {
      id: 'LOG100006',
      userId: 'ADMIN002',
      userName: '财务主管',
      ip: '192.168.1.103',
      action: '导出报表',
      actionType: 'export',
      module: '报表管理',
      detail: '导出7月份交易报表',
      status: 'success',
      createTime: '2023-07-31 17:10:00',
    },
    {
      id: 'LOG100007',
      userId: 'USER004',
      userName: '智慧科技',
      ip: '192.168.1.104',
      action: '充值',
      actionType: 'create',
      module: '交易管理',
      detail: '充值50000元',
      status: 'success',
      createTime: '2023-07-29 14:15:10',
    },
    {
      id: 'LOG100008',
      userId: 'USER001',
      userName: '张三',
      ip: '192.168.1.105',
      action: '登录',
      actionType: 'login',
      module: '用户认证',
      detail: '用户登录系统',
      status: 'success',
      createTime: '2023-07-31 09:00:00',
    },
  ];

  const { current = 1, pageSize = 10 } = params;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: logs.slice(startIndex, endIndex),
    total: logs.length,
    success: true,
  };
};

const OperationLogsPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const actionTypeColorMap = {
    query: 'blue',
    create: 'green',
    update: 'orange',
    delete: 'red',
    import: 'purple',
    export: 'purple',
    login: 'cyan',
    logout: 'cyan',
  };

  const columns: ProColumns<OperationLog>[] = [
    {
      title: '日志ID',
      dataIndex: 'id',
      copyable: true,
      width: 120,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      width: 120,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
    },
    {
      title: '操作类型',
      dataIndex: 'actionType',
      filters: true,
      valueEnum: {
        query: { text: '查询', status: 'Processing' },
        create: { text: '创建', status: 'Success' },
        update: { text: '更新', status: 'Warning' },
        delete: { text: '删除', status: 'Error' },
        import: { text: '导入', status: 'Default' },
        export: { text: '导出', status: 'Default' },
        login: { text: '登录', status: 'Processing' },
        logout: { text: '登出', status: 'Processing' },
      },
      render: (_, record) => (
        <Badge
          color={actionTypeColorMap[record.actionType]}
          text={record.actionType}
        />
      ),
    },
    {
      title: '模块',
      dataIndex: 'module',
      filters: true,
      valueEnum: {
        '账户管理': { text: '账户管理' },
        '交易管理': { text: '交易管理' },
        '报表管理': { text: '报表管理' },
        '用户认证': { text: '用户认证' },
      },
    },
    {
      title: '详情',
      dataIndex: 'detail',
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        { text: '成功', value: 'success' },
        { text: '失败', value: 'failure' },
      ],
      render: (_, record) => (
        <Badge
          status={record.status === 'success' ? 'success' : 'error'}
          text={record.status === 'success' ? '成功' : '失败'}
        />
      ),
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="details"
          onClick={() => {
            console.log('查看日志详情:', record.id);
          }}
        >
          详情
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<OperationLog>
        headerTitle="操作日志"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={getOperationLogs}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
      />
    </PageContainer>
  );
};

export default OperationLogsPage; 