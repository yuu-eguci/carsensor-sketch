import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from './views/Top.vue'
import Items from './views/Items.vue'
import Item from './views/Item.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
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