import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import PlaySpace from '../components/PlaySpace.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/play-space',
    name: 'PlaySpace',
    component: PlaySpace
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
