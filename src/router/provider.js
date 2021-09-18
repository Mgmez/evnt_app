export default [
  {
    path: '/profile/:id',
    name: 'provider-profile',
    component: () => import('@/views/provider/profile/ProviderProfile.vue'),
  },
]
