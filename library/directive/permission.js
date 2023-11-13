import store from '@/store'

function checkPermission(el, binding) {
    const { value } = binding

    const permission_keys = store.getters.permission || []
    const isSuper = store.getters.isSuper

    if (value && value instanceof Array) {
        if (value.length > 0) {
            const hasPermission = value.some(key => {
                return permission_keys.includes(key)
            })
            if (!hasPermission && !isSuper) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    } else {
        throw new Error(`权限不足`)
    }
}

export default {
    inserted(el, binding) {
        checkPermission(el, binding)
    },
    update(el, binding) {
        checkPermission(el, binding)
    }
}
