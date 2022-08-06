import Layout from '@/layout'
export default {
    path: '/sku',
    component: Layout,
    redirect: '/sku/sku-class',
    name: 'sku',
    children: [
      {
        path: 'sku-class',
        name: 'sku-class',
        component: () => import('@/views/sku/sku-class'),
      },
      {
        path: 'sku',
        name: 'sku',
        component: () => import('@/views/sku/sku'),
      }
    ]
  }