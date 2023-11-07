import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/userinfo',
  name: 'userinfo',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.userinfo',
    requiresAuth: true,
    icon: 'icon-perfmanage',
    order: 0,
  },
  children: [
    {
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/userinfo/profile/index.vue'),
      meta: {
        locale: 'menu.userinfo.profile',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
