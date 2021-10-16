function checkProfile(to) {
  const user = JSON.parse(localStorage.getItem('userData'))
  console.log(user.data[0].id)
  console.log(to.params.id)
  if (user.data[0].id === to.params.id) return true
  return true
}

export default [
  {
    path: '/profile/:id',
    name: 'provider-profile',
    component: () => import('@/views/provider/profile/ProviderProfile.vue'),
  },
  {
    path: '/profile/update/:id',
    name: 'provider-update-profile',
    component: () => import('@/views/provider/updateInformation/ProviderEdit.vue'),
    beforeEnter(to, _, next) {
      if (checkProfile(to)) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/profile/service/update/:id',
    name: 'provider-update-service',
    component: () => import('@/views/provider/profile/service/edit/Service.vue'),
    beforeEnter(to, _, next) {
      if (checkProfile(to)) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/profile/service/add',
    name: 'provider-add-service',
    component: () => import('@/views/provider/profile/service/add/Service.vue'),
    beforeEnter(to, _, next) {
      if (checkProfile(to)) next()
      else next({ name: 'error-404' })
    },
  },
]
