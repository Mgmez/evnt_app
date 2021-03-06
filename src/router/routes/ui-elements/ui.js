export default [
  {
    path: '/ui/typography',
    name: 'ui-typography',
    component: () => import('@/views2/ui/typography/Typography.vue'),
    meta: {
      pageTitle: 'Typography',
      breadcrumb: [
        {
          text: 'UI',
        },
        {
          text: 'Typography',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ui/colors',
    name: 'ui-colors',
    component: () => import('@/views2/ui/colors/Colors.vue'),
    meta: {
      pageTitle: 'Colors',
      breadcrumb: [
        {
          text: 'UI',
        },
        {
          text: 'Colors',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ui/feather',
    name: 'ui-feather',
    component: () => import('@/views2/ui/feather/Feather.vue'),
    meta: {
      pageTitle: 'Feather',
      breadcrumb: [
        {
          text: 'UI',
        },
        {
          text: 'Feather',
          active: true,
        },
      ],
    },
  },
]
