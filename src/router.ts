import { createRouter, createWebHistory } from 'vue-router'
import Top from './views/Top.vue'
import Items from './views/Items.vue'
import Item from './views/Item.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top
    },
    {
      path: '/items',
      name: 'items',
      component: Items
    },
    {
      path: '/item',
      name: 'item',
      component: Item
    }
  ]
})