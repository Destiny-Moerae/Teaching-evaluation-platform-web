import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SCOREALLOCATION: AppRouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'icon-pen',
    order: 2,
  },
  children: [
    {
      path: 'card', // The midline path complies with SEO specifications
      name: 'Card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        locale: 'menu.list.informationTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],

};

export default SCOREALLOCATION;
