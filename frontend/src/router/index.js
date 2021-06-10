import { createWebHistory, createRouter } from "vue-router"
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Wall from '../views/Wall.vue'
import CreateMessage from '../views/CreateMessage.vue'
import ModifyProfile from '../views/ModifyProfile.vue'
import OneMessage from '../views/OneMessage.vue'

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
    path: '/Wall',
    name: 'wall',
    component: Wall
  },
  {
    path: '/CreateMessage',
    name: 'createmessage',
    component: CreateMessage
  },
  {
    path: '/modifyProfile',
    name: 'modifyprofile',
    component: ModifyProfile
  },
  {
    path: '/onemessage/:id',
    name: 'OneMessage',
    component: OneMessage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router