import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from "@/store";
import {mode as routerMode} from "@/config/router.config"
import {appTitle} from "@/config/system.config"
import permissionButtons from "./permissionButtons"

// 系统固定页面
import Login from "@/views/Login.vue";
import Page404 from "@/views/404.vue";
import Page403 from "@/views/403.vue";

// 路由模块
import home from "@/router/modules/home";


// 解决导航重复
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
}


export const routes = [
    {
        path: '/',
        redirect: "/home",
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/403',
        name: '403',
        component: Page403,
    },
    {
        path: '/404',
        name: '404',
        component: Page404,
    }
]

export const tailRoutes = [
    {
        path: '*',
        redirect: "/404",
    },
]

export const anyRoutes = [
    home,
    // problemFeedback,
    // administration,
    // staff,
    // system,
    // personal,
    // role
];


const createRouter = () => {

    const openAsyncRoutes = getPermissionRoutes(anyRoutes, []);
    // 设置根目录跳转到有权访问的路由
    if (openAsyncRoutes.length) routes[0].redirect = openAsyncRoutes[0].redirect

    const defaultRoutes = routes.concat(anyRoutes).concat(tailRoutes);
    store.dispatch("setRoutes", defaultRoutes)

    return new VueRouter({
        mode: routerMode,
        routes: defaultRoutes
    });
}

/**
 * 获取
 * @param routes
 * @param permission
 * @returns {*[]}
 */
export const getPermissionRoutes = (routes = [], permission = []) => {

    const isSuper = store.getters.isSuper

    return routes.filter(item => {
        if (permission.includes(item.id) || !item.id || isSuper) {
            if (item.children && item.children.length) {
                item.children = getPermissionRoutes(item.children, permission);
            }
            return true;
        }
    })
}

/**
 * 获取全部设置权限的路由平铺path
 * @param userRoutes
 * @returns {*[]}
 */
export const getPermissionRoutesPaths = (userRoutes = [], basePath = "") => {
    const permissionRoutesPaths = [];
    for (let i = 0; i < userRoutes.length; i++) {
        const path = basePath ? `${basePath}/${userRoutes[i].path}` : userRoutes[i].path;
        permissionRoutesPaths.push(path);
        if (userRoutes[i].children && userRoutes[i].children.length) {
            getPermissionRoutesPaths(userRoutes[i].children, path).map(path => permissionRoutesPaths.push(path))
        }
    }
    return permissionRoutesPaths;
}

/**
 * 获取全部设置权限的路由树
 * @param asyncRoutes
 * @returns {*[]}
 */
export const getAllPermissionAsyncRoutesTree = (asyncRoutes = []) => {

    const tree = [];

    const filter = asyncRoutes.filter(item => item.id);
    for (let i = 0; i < filter.length; i++) {
        const item = filter[i];
        const obj = {};
        obj['value'] = item.id;
        obj['label'] = item.meta && item.meta.title ? item.meta.title : item.name || item.path;
        obj['children'] = [];
        tree.push(obj);
        if (filter[i].children && filter[i].children.length) obj['children'] = getAllPermissionAsyncRoutesTree(filter[i].children);
        if (!filter[i].children || !filter[i].children.length) obj['children'] = permissionButtons[item.id];
    }
    return tree;
}

/**
 * 更新站点标题
 * @param to
 */
export const updatePageTitle = (to = {}) => {
    if (to.meta && to.meta.title) return document.title = `${appTitle} - ${to.meta.title}`
    document.title = appTitle;
}

const router = createRouter()

export default router
