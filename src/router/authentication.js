export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/auth-register-v1',
    name: 'auth-register-v1',
    component: () => import('@/views/pages/register/ProfileSelector.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/auth-register-v1/customer',
    name: 'customer-register-v1',
    component: () => import('@/views/pages/register/Customer.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/auth-register-v1/provider',
    name: 'provider-register-v1',
    component: () => import('@/views/pages/register/Provider.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
]
