import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false

import "@/router/permission"

// 载入library
import "../library";


// 全局挂载全局组件
import  Pagination from "@/components/Pagination"
// eslint-disable-next-line vue/multi-word-component-names
Vue.component("Pagination",Pagination)

import createMockServes from "../mock";

if (process.env.NODE_ENV === "mockJs") {
    createMockServes()
}

import userSuper from "@/directive/userSuper";

Vue.directive("userSuper",userSuper)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
