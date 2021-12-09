// eslint-disable-next-line no-unused-vars
function checkPermission() {
  const clientPattern = '(C|c).*'
  const { role } = JSON.parse(localStorage.getItem('userData')).data[0]
  if (role.match(clientPattern)) return true
  return false
}

export default [
  {
    path: '/categories-list',
    name: 'categories-list',
    component: () => import('@/views/client/category/CategoryList.vue'),
  },
  {
    path: '/subcategory-list/:id',
    name: 'subcategory-list',
    component: () => import('@/views/client/subcategory/SubCategoryList.vue'),
    props: true,
  },
  {
    path: '/provider-list/:id',
    name: 'provider-list',
    component: () => import('@/views/client/provider/ProviderList.vue'),
    props: true,
  },
  {
    path: '/my-events',
    name: 'my-events-list',
    component: () => import('@/views/client/events/Events.vue'),
    props: true,
    beforeEnter(to, _, next) {
      if (checkPermission()) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/my-events/create',
    name: 'my-events-create',
    component: () => import('@/views/client/events/CreateForm.vue'),
    props: true,
    beforeEnter(to, _, next) {
      if (checkPermission()) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/my-event/info/:id',
    name: 'my-event-info',
    component: () => import('@/views/client/events/EventInfo.vue'),
    props: true,
    beforeEnter(to, _, next) {
      if (checkPermission()) next()
      else next({ name: 'error-404' })
    },
  },
]
