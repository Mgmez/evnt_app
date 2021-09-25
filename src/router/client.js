export default [
  {
    path: '/categories-list',
    name: 'categories-list',
    component: () => import('@/views/client/category/CategoryList.vue'),
  },
  {
    path: '/subcategory-list/:name',
    name: 'subcategory-list',
    component: () => import('@/views/client/subcategory/SubCategoryList.vue'),
    props: true,
  },
  {
    path: '/provider-list/:name',
    name: 'provider-list',
    component: () => import('@/views/client/provider/ProviderList.vue'),
    props: true,
  },
  {
    path: '/my-events',
    name: 'my-events-list',
    component: () => import('@/views/client/events/Events.vue'),
    props: true,
  },
  {
    path: '/my-events/create',
    name: 'my-events-create',
    component: () => import('@/views/client/events/CreateForm.vue'),
    props: true,
  },
]
