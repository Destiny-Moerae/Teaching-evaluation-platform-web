import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const EVALUTIONCAL: AppRouteRecordRaw = {
  path: '/evalution-cal',
  name: 'evalutioncal',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.evalution-cal',
    requiresAuth: true,
    icon: 'icon-computer',
    order: 3,
  },
};

export default EVALUTIONCAL;