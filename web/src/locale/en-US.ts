import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localePerfshow from '@/views/perfmanage/perfshow/locale/en-US';
import localeScoreassign from '@/views/perfmanage/scoreassign/locale/en-US';
import localeProfile from '@/views/userinfo/profile/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.perfmanage': 'Perfmanage',
  'menu.server.perfmanage': 'Perfmanage-Server',
  'menu.server.perfshow': 'Perfshow-Server',
  'menu.userinfo': 'Userinfo',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localePerfshow,
  ...localeScoreassign,
  ...localeProfile,
};
