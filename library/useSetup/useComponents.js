import LibLogoTitle from "../components/LibLogoTitle/LibLogoTitle.vue";
import LibAside from "../components/LibAside/LibAside.vue";
import LibAsideVerticalTags from "../components/LibAside/LibAsideVerticalTags.vue";
import LibAsideMenuItem from "../components/LibMenu/LibAsideMenuItem.vue";
import LibMenuItem from "../components/LibMenu/LibMenuItem.vue";
import LibSubMenu from "../components/LibMenu/LibSubMenu.vue";
import LibAvatar from "../components/LibAvatar/LibAvatar.vue";
import LibCollapseIcon from "../components/LibCollapseIcon/LibCollapseIcon.vue";
import LibSetupSuspensionIcon from "../components/LibSetupSuspensionIcon/LibSetupSuspensionIcon.vue";
import LibSetupDrawer from "../components/LibSetupDrawer/LibSetupDrawer.vue";

export default {
    install(app) {
        app.component("LibLogoTitle", LibLogoTitle)
        app.component("LibAside", LibAside)
        app.component("LibAsideVerticalTags", LibAsideVerticalTags)
        app.component("LibAsideMenuItem", LibAsideMenuItem)
        app.component("LibMenuItem", LibMenuItem)
        app.component("LibSubMenu", LibSubMenu)
        app.component("LibAvatar", LibAvatar)
        app.component("LibCollapseIcon", LibCollapseIcon)
        app.component("LibSetupSuspensionIcon", LibSetupSuspensionIcon)
        app.component("LibSetupDrawer", LibSetupDrawer)
    }
}
