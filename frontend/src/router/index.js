import { createWebHistory, createRouter } from "vue-router"
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import AllPost from '../views/AllPost.vue'
import CreateMessage from '../views/CreateMessage.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/AllPost',
    name: 'allpost',
    component: AllPost
  },
  {
    path: '/CreateMessage',
    name: 'createmessage',
    component: CreateMessage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router