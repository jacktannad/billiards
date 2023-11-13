import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);

    modules[moduleName] = value.default;
    return modules
}, {});

const store = new Vuex.Store({
    namespaced: false, // true 开启模块命名空间
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules
});

// store.subscribe((mutation, state) => {
//     console.log("subscribe mutation:", mutation)
//     console.log("subscribe state:", state)
//     console.log(automatic_persistence_mutations)
// })

export default store;
