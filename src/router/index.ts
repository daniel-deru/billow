import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/views/HomePage.vue"
import ShoppingListItemPage from '@/views/ShoppingListItemPage.vue'
import ShoppingListsPage from '@/views/ShoppingListsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/shopping-lists',
      name: 'shopping-lists',
      component: ShoppingListsPage
    },
    {
      path: '/shopping-lists/:item',
      name: 'shopping-list-item',
      component: ShoppingListItemPage
    }
  ]
})

export default router
