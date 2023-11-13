import {getStore, setStore} from "@/utils/storageUtils";

import {tokenKey, userKey} from "@/config/storageKeys.config"
import {Message} from "element-ui";

const login_payload = {
    token: "",
    userInfo: {},
    isSuper: false
}

export default {
    state: {
        userInfo: getStore(userKey, true),
        token: getStore(tokenKey),
        isSuper: false
    },
    getters: {
        token: (state) => state.token || null,
        isSuper: (state) => state.isSuper || false,
        department: (state) => state.userInfo.department || null,
        user_id: (state) => state.userInfo && state.userInfo.id ? state.userInfo.id : null,
        nickName: (state) => state.userInfo && state.userInfo.id ? state.userInfo.username : null,
        avatar: (state) => state.userInfo && state.userInfo.id ? state.userInfo.avatar : null,
    },
    mutations: {
        UPDATE_IS_SUPER: (state, payload) => {
            state.isSuper = payload;
        },
        LOGIN: (state, payload = login_payload) => {
            state.token = payload.token;
            state.userInfo = payload.user;

            setStore(tokenKey, payload.token)
            setStore(userKey, payload.user)
        },
        LOGIN_OUT: (state) => {
            state.token = "";
            state.userInfo = "";
            setStore(tokenKey, "")
            setStore(userKey, "")
        }
    },
    actions: {
        updateIsSuper: ({commit}, payload) => {
            commit("UPDATE_IS_SUPER", payload)
        },
        login: ({commit, dispatch}, payload) => {
            return HTTP.post("login_user",payload).then(async (resp) => {

                if (resp.errorCode !== 0) {
                     Message.error(`${resp.data.msg}`);
                    return Promise.reject(resp)
                }

                const login_data = resp.data;
                const {user} = login_data;

                commit("UPDATE_IS_SUPER", user.is_superuser)
                dispatch("getUserPermission", user.id)

                console.log("login_data ---------------:",login_data)

                commit("LOGIN", login_data);

                Message.success("登录成功");

                return login_data
            }).catch(error => {
                Message.error(`${error.msg}`);
                return error;
            })
        },
        loginOut: ({commit}) => {
            commit("LOGIN_OUT")
        }
    }
}
