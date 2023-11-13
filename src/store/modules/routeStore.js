import {getStore} from "@/utils/storageUtils";
import {currentRouteKey} from "@/config/storageKeys.config";
import {getPermissionRoutes, getPermissionRoutesPaths} from "@/router";

export default {
    state: {
        routes: [],
        role_permission: false,
        userRoutes: [],
        permission: [], //  [] , 加载用户但没有权限：false
        currentRoute: getStore(currentRouteKey, true),
    },
    getters: {
        routes: (state) => state.routes,
        role_permission: (state) => state.role_permission,
        userRoutes: (state) => state.userRoutes,
        currentRoute: (state) => state.currentRoute,
        userRoutePaths: (state) => getPermissionRoutesPaths(state.userRoutes),
        permission: (state) => state.permission,
        menus: (state) => {
            if (!state.userRoutes || !state.userRoutes.length) return [];
            return state.userRoutes.filter(route => route.meta && route.meta.title && !route.meta.hidden)
        },
    },
    mutations: {
        SET_ROLE_PERMISSION: (state, role_permission) => {
            state.role_permission = role_permission ||  false;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = permission && permission.length ? permission : false;
        },
        SET_USER_ROUTES: (state, payload = []) => {
            state.userRoutes = payload
        },
        SET_ROUTES: (state, payload = []) => {
            state.routes = payload
        }
    },
    actions: {
        getUserPermission: ({state, commit,getters, dispatch}, userId) => {
            return new Promise((resolve, reject) => {

                if (!userId) return reject("用户没有登录");

                HTTP.getReadById("user",userId).then((resp) => {

                    const login_data = resp.data;


                    const {user_permissions} = login_data;

                    commit("SET_ROLE_PERMISSION",login_data.role_permission)
                    commit("SET_PERMISSION", user_permissions)
                    dispatch("updateIsSuper", login_data.is_superuser)

                    dispatch("setUserRoutes", {
                        routes: state.routes,
                        permission: user_permissions
                    }).then(permission_routes => {
                        commit("SET_USER_ROUTES", permission_routes)
                        resolve(getters.userRoutePaths);
                    })

                }).catch(err => {
                    console.log("err:", err)
                    reject(err);
                })
            })
        },
        setUserRoutes: ({commit}, {routes, permission}) => {
            return new Promise(resolve => {
                const permission_routes = getPermissionRoutes(routes, permission);
                commit("SET_USER_ROUTES", permission_routes)
                resolve(permission_routes);
            })
        },
        setRoutes: ({commit, dispatch}, routes = []) => {
            commit("SET_ROUTES", routes)
            dispatch("setUserRoutes", {routes, permission: []});
        }
    }
}
