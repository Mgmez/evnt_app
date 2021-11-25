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
  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/pages/authentication/ForgotPassword-v1.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/reset-password/:token',
    name: 'auth-reset-password',
    component: () => import('@/views/pages/authentication/ResetPassword-v1.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
]
