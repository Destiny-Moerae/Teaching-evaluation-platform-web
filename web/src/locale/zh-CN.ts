import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localePerfshow from '@/views/perfmanage/perfshow/locale/zh-CN';
import localeScoreassign from '@/views/perfmanage/scoreassign/locale/zh-CN';
import localeProfile from '@/views/userinfo/profile/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.perfmanage': '业绩管理',
  'menu.server.perfmanage': '业绩管理-服务端',
  'menu.server.perfshow': '业绩展示-服务端',
  'menu.userinfo': '用户信息',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localePerfshow,
  ...localeScoreassign,
  ...localeProfile,
};
