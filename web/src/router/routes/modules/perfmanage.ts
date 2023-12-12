import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/perfmanage',
  name: 'perfmanage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.perfmanage',
    requiresAuth: true,
    icon: 'icon-perfmanage',
    order: 0,
  },
  children: [
    {
      path: 'perfshow',
      name: 'Perfshow',
      component: () => import('@/views/perfmanage/perfshow/index.vue'),
      meta: {
        locale: 'menu.perfmanage.perfshow',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
