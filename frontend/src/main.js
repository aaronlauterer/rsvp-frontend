// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VForm,
  VCheckbox,
  VTextField,
  VAlert,
  VProgressCircular,
  VRadioGroup,
  VDataTable,
  VDialog,
  VCard
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import '@/assets/styles.scss'
import '@/assets/font-connoisseurs/stylesheet.css'
import '../node_modules/typeface-montserrat/index.css'
import '../node_modules/material-design-icons-iconfont'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VForm,
    VCheckbox,
    VTextField,
    VAlert,
    VProgressCircular,
    VRadioGroup,
    VDataTable,
    VDialog,
    VCard
  },
  theme: {
    primary: '#EC475D',
    secondary: '#EC475D',
    accent: '#EC475D',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
