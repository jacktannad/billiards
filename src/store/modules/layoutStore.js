import {getStore, setStore} from "@/utils/storageUtils";
import {isCollapseKey, layout_key} from "@/config/storageKeys.config"
import {layout, setupIcon} from "@/config/layout.config"

export default {
    state: {
        setupIcon: setupIcon,
        layout: getStore(layout_key) || layout,
        isCollapse: !!getStore(isCollapseKey)
    },
    getters: {
        setupIcon: state => state.setupIcon,
        layout: state => state.layout || layout,
        isCollapse: state => state.isCollapse || false,
    },
    mutations: {
        SET_LAYOUT: (state, payload) => {
            state.layout = payload
            setStore(layout_key, payload)
        },
        TAG_COLLAPSE: (state) => {
            state.isCollapse = !state.isCollapse
            setStore(isCollapseKey, state.isCollapse ? true : '')
        }
    },
    actions: {
        tagCollapse: ({commit}) => {
            commit("TAG_COLLAPSE")
        },
        setLayout: ({commit}, payload) => {
            commit("SET_LAYOUT", payload)
        }
    },
}
