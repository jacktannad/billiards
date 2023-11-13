<script>
import {defineComponent} from "vue";
import {mapGetters} from "vuex";
import {comTitle} from "@/config/system.config";
import comLogo from "@/assets/logo.png"

export default defineComponent({
    name: "verticalTagsLayout",
    data() {
        return {
            comLogo,
            comTitle
        }
    },
    computed: {
        ...mapGetters(['menus', 'isCollapse']),
        currentRoute: function () {
            const path_root = "/" + this.$route.fullPath.split('/')[1];
            const router = this.menus.filter(menu => menu.path === path_root);
            return router.length ? router[0] : null;
        },
        currentRouteChildren: function () {
            return this.currentRoute ? this.currentRoute.children || [] : [];
        }
    },
    watch: {
        currentRoute: function (newV) {
            console.log("newV:", newV)
        }
    },
    methods: {
        goHome() {
            this.$router.push("/")
        },
        /**
         * 切换路由
         * @param route
         */
        handleRouteTags(route) {
            this.$router.push(`${this.currentRoute.path}/${route.path}`)
        },
        isActivePath(route) {
            const paths = this.$route.path.split("/")
            return paths.includes(route.path)
        }
    }
})
</script>

<template>
    <div class="vertical-tags-layout" :class="{'collapse-aside': isCollapse }" style="width: 100% !important;">
        <aside>
            <LibLogoTitle @goHome="goHome"/>
<!--            <LibAsideVerticalTags :collapseMenu="true" :isCollapse="isCollapse" :menu="menus">-->
<!--            </LibAsideVerticalTags>-->
        </aside>
        <main>
            <header>
                <div class="left-nav">
                    <LibCollapseIcon/>
                </div>
                <div class="right-avatar">
                    <lib-avatar></lib-avatar>
                </div>
            </header>
            <section class="app-main"
                     :class="{ 'show-route-tags' : currentRouteChildren.length > 0 && (currentRoute.meta && currentRoute.meta.tags !== false) }">
                <div class="route-tags">
                    <div @click="handleRouteTags(route)" class="route-tag" :class="{ 'active' : isActivePath(route) }"
                         v-for="(route,index) in currentRouteChildren"
                         :key="index">{{ route.meta.title }}
                    </div>
                </div>
                <div class="route-page">
                    <router-view/>
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss">
@import "verticalTagsLayout";
</style>
