// import '@babel/polyfill'  // 暂时不需要全部编译

import Vue from 'vue'
// 按需加载需要使用的组件
import {
    Button,
    Select
} from 'element-ui';
import App from './App.vue'

Vue.prototype.$ELEMENT = { size: 'small' };

Vue.use(Button);
Vue.use(Select);

new Vue({
    el: '#app',
    render: h => h(App)
})