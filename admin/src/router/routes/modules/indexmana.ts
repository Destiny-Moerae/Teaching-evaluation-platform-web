import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const INDEXMANAGE: AppRouteRecordRaw = {
  path: '/indexmanage',
  name: 'indexmanage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.indexmanage',
    requiresAuth: true,
    icon: 'icon-select-all',
    order: 1,
  },
};

export default INDEXMANAGE;