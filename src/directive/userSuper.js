import $store from "@/store"

const isSuperOrAdmin = (el) => {
    const isSuper = $store.getters.isSuper
    const role_permission = $store.getters.role_permission
    if( !isSuper && !role_permission ) el.parentNode && el.parentNode.removeChild(el)
}


export default {
    inserted(el) {
        isSuperOrAdmin(el)
    },
    update(el) {
        isSuperOrAdmin(el)
    }
}
