import { createWebHistory, createRouter } from "vue-router"
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Wall from '../views/Wall.vue'
import CreateMessage from '../views/CreateMessage.vue'
import ModifyProfile from '../views/ModifyProfile.vue'
import Message from '../views/Message.vue'
import ListUser from '../views/Users.vue'
import ModifyPassword from '../views/ModifyPassword.vue'

import store from '@/store/index.js'

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
    path: '/modifyPassword',
    name: 'modifypassword',
    component: ModifyPassword
  },
  {
    path: '/onemessage/:id',
    name: 'Message',
    component: Message
  },
  {
    path: '/listusers',
    name: 'listusers',
    component: ListUser
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && store.state.user.userId === -1) next({ name: 'login' })
  else next()
})

export default router