import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShoppingListEntryViewVue from '../views/ShoppingListEntryView.vue'
import ShoppingListViewVue from '../views/ShoppingListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/shopping-lists',
      name: 'shopping-lists',
      component: ShoppingListViewVue
    },
    {
      path: '/shopping-lists/:item',
      name: 'shopping-list-item',
      component: ShoppingListEntryViewVue
    }
  ]
})

export default router
