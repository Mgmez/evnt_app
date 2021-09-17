export default [
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/administration/roles/RoleList.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/roles/edit/:id',
    name: 'roles-edit',
    component: () => import('@/views/administration/roles/RoleEdit.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/administration/user/UserList.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/users/edit/:id',
    name: 'users-edit',
    component: () => import('@/views/administration/user/UsersEdit.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/administration/customer/CustomersList.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/customers/edit/:id',
    name: 'customers-edit',
    component: () => import('@/views/administration/customer/CustomersEdit.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/providers',
    name: 'providers',
    component: () => import('@/views/administration/provider/ProviderList.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/providers/edit/:id',
    name: 'providers-edit',
    component: () => import('@/views/administration/provider/ProviderEdit.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/administration/category/CategoryList.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/categories/edit/:id',
    name: 'categories-edit',
    component: () => import('@/views/administration/category/CategoryEdit.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/subcategories',
    name: 'subcategories',
    component: () => import('@/views/administration/subCategory/SubCategoryList.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/subcategories/edit/:id',
    name: 'subcategories-edit',
    component: () => import('@/views/administration/subCategory/SubCategoryEdit.vue'),
    beforeEnter(to, _, next) {
      if (JSON.parse(localStorage.getItem('lastNewUser')).role.name === 'Proveedor') next()
      else next({ name: 'error-404' })
    },
  },
]
