export default [
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/administration/roles/RoleList.vue'),
  },
  {
    path: '/roles/edit/:id',
    name: 'roles-edit',
    component: () => import('@/views/administration/roles/RoleEdit.vue'),
  },
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
  {
    path: '/providers',
    name: 'providers',
    component: () => import('@/views/administration/provider/ProviderList.vue'),
  },
  {
    path: '/providers/edit/:id',
    name: 'providers-edit',
    component: () => import('@/views/administration/provider/ProviderEdit.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/administration/category/CategoryList.vue'),
  },
  {
    path: '/categories/edit/:id',
    name: 'categories-edit',
    component: () => import('@/views/administration/category/CategoryEdit.vue'),
  },
  {
    path: '/subcategories',
    name: 'subcategories',
    component: () => import('@/views/administration/subCategory/SubCategoryList.vue'),
  },
  {
    path: '/subcategories/edit/:id',
    name: 'subcategories-edit',
    component: () => import('@/views/administration/subCategory/SubCategoryEdit.vue'),
  },
]
