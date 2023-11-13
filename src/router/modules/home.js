import Layouts from "/library/layouts/index.vue";

import home from "@/assets/router-icon/home.png";
import home_on from "@/assets/router-icon/home-on.png";

export default {
    path: '/home',
    name: 'Home',
    component: Layouts,
    redirect: "/home/homeIndex",
    meta: {
        title: "首页",
        icon: home,
        icon_on: home_on,
        tags: false
    },
    children: [
        {
            path: 'homeIndex',
            name: 'HomeIndex',
            meta: {
                title: "首页"
            },
            component: () => import("@/views/Home/Home.vue"),
        }
    ]
}
