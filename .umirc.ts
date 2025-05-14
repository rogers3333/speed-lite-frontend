import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '支付结算系统',
    locale: false,
  },
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      name: '首页',
      path: '/dashboard',
      component: './Dashboard',
    },
    {
      name: '结算管理',
      path: '/settlement',
      routes: [
        {
          name: '入账请求管理',
          path: '/settlement/deposit-requests',
          component: './Settlement/DepositRequests',
        },
        {
          name: '费用类型管理',
          path: '/settlement/fee-types',
          component: './Settlement/FeeTypes',
        },
        {
          name: '入账规则管理',
          path: '/settlement/deposit-rules',
          component: './Settlement/DepositRules',
        },
        {
          name: '冻结规则管理',
          path: '/settlement/freeze-rules',
          component: './Settlement/FreezeRules',
        },
      ],
    },
    {
      name: '账户管理',
      path: '/account',
      routes: [
        {
          name: '账户管理',
          path: '/account/management',
          component: './Account/Management',
        },
        {
          name: '账户流水',
          path: '/account/transactions',
          component: './Account/Transactions',
        },
        {
          name: '操作记录',
          path: '/account/operation-logs',
          component: './Account/OperationLogs',
        },
      ],
    },
  ],
  npmClient: 'npm',
});

