import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import localePerfmange from '@/views/perfmanage/perfshow/locale/zh-CN';
import localeTable from '@/views/list/search-table/locale/zh-CN';
import localeSettings from './zh-CN/settings';

export default {
  'menu.admin': '用户管理',
  'menu.perfmanage': '指标管理',
  'menu.list': '业绩数据划拨审批',
  'menu.evalution-cal': '评估考核计算',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
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
  ...localeWorkplace,
  ...localePerfmange,
  ...localeTable,
};
