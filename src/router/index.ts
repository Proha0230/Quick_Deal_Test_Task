import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import TaskPage from "@/views/TaskPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/task-page',
    name: 'TaskPage',
    component: TaskPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
