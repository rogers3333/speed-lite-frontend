// 运行时配置
import { Settings as LayoutSettings } from '@ant-design/pro-components';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ 
  name: string;
  settings?: Partial<LayoutSettings>;
}> {
  return { 
    name: '支付结算系统', 
    settings: {
      navTheme: 'light',
      layout: 'side',
      contentWidth: 'Fluid',
      fixedHeader: true,
      fixSiderbar: true,
      colorWeak: false,
    },
  };
}

export const layout = ({ initialState }: { initialState: any }) => {
  return {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    menu: {
      locale: false,
      defaultOpenAll: true,
    },
    // 水印设置
    waterMarkProps: {
      content: initialState?.name,
    },
    // 页脚设置
    footerRender: false,
    // 菜单项多语言关闭
    locale: false,
    // 其他设置
    ...initialState?.settings,
  };
};
