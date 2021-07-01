export default [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/administration/user/UserList.vue'),
  },
]
