import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "@/views/HomePage.vue"
import ShoppingListItemPage from '@/views/ShoppingListItemPage.vue'
import MyShoppingListsPage from '@/views/MyShoppingListsPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: '/shopping-lists',
      name: 'shopping-lists',
      component: MyShoppingListsPage
    },
    {
      path: '/shopping-lists/:item',
      name: 'shopping-list-item',
      component: ShoppingListItemPage
    }
  ]
})

export default router
