export default [
  {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views2/dashboard/analytics/Analytics.vue'),
  },
  {
    path: '/dashboard/ecommerce',
    name: 'dashboard-ecommerce',
    component: () => import('@/views2/dashboard/ecommerce/Ecommerce.vue'),
  },
]
