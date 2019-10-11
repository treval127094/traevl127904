import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import message from './views/message.vue'
import theme from './views/theme.vue'
import prolist from './components/prolist.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/prolist/:id/:title',
      name: 'prolist',
      component: prolist
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/theme',
      name: 'theme',
      component: theme
    },
  ]
})
