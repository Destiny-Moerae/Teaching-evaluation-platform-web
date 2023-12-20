import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const INDEXMANAGE: AppRouteRecordRaw = {
  path: '/perfmanage',
  name: 'perfmanage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.perfmanage',
    requiresAuth: true,
    icon: 'icon-select-all',
    order: 1,
  },
  children: [
    {
      path: 'perftree',
      name: 'perftree',
      component: () => import('@/views/perfmanage/perfshow/index.vue'),
      meta: {
        locale: 'menu.perfmanage.perfshow',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default INDEXMANAGE;
