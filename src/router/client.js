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
]
