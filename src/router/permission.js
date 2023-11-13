import router, {
    updatePageTitle,
} from "@/router/index";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from "@/store";

NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach(async (to, from, next) => {
    NProgress.start();

    const token = store.getters.token;
    const permission = store.getters.permission;

    if (!token) {
        if (to.path === "/login") return next();
        return next("/login")
    }

    if (token && permission.length === 0 && to.path !== "/login") await store.dispatch("getUserPermission", store.getters.user_id);
    // const userRoutePaths = store.getters.userRoutePaths || [];

    if (token && to.path === "/login") return next({...from, replace: true})
    next()

    // 用户登录，权限数据丢失或者页面刷新，进行重新加载用户权限
    // if ( token && permission.length === 0 ) await store.dispatch("getUserPermission", store.getters.user_id);
    //
    // // 最新用户路由path
    // const userRoutePaths = store.getters.userRoutePaths || [];
    //
    // console.log("userRoutePaths:",userRoutePaths)
    //
    // if (userRoutePaths.includes(to.path)) {
    //     // console.log("路由有权限")
    //     next()
    // } else {
    //     // console.log("路由没有权限")
    //     next("/403")
    // }
})

//当路由跳转结束后
router.afterEach((to) => {

    updatePageTitle(to);
    // 关闭进度条
    NProgress.done()
})
