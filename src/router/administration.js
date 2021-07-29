export default [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/administration/user/UserList.vue'),
  },
  {
    path: '/users/edit/:id',
    name: 'users-edit',
    component: () => import('@/views/administration/user/UsersEdit.vue'),
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/administration/customer/CustomersList.vue'),
  },
  {
    path: '/customers/edit/:id',
    name: 'customers-edit',
    component: () => import('@/views/administration/customer/CustomersEdit.vue'),
  },
]
