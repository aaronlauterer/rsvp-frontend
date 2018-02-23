import Vue from 'vue'
import Router from 'vue-router'
import start from '@/components/start'
import manage from '@/components/manage'
import rsvp from '@/components/rsvp'
import done from '@/components/done'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: start
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/rsvp/:code',
      name: 'rsvp',
      component: rsvp
    },
    {
      path: '/done',
      name: 'done',
      component: done
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
