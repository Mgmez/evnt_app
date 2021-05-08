export default [
  {
    path: '/access-control',
    name: 'access-control',
    component: () => import('@/views2/extensions/acl/AccessControl.vue'),
    meta: {
      resource: 'ACL',
      action: 'read',
    },
  },
]
