/* import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/demo',
  name: 'demo',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.admin',
    requiresAuth: true,
    icon: 'icon-UserGroup',
    order: 0,
  },
  children: [
    {
      path: 'demo',
      name: 'Demo',
      component: () => import('@/views/demo/index.vue'),
      meta: {
        locale: 'menu.admin.demo',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD; */
