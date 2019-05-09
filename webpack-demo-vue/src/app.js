// import '@babel/polyfill'  // 暂时不需要全部编译

import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')