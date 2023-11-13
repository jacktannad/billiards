import axios from "axios";
import apis from "@/api"

import {getStore} from "@/utils/storageUtils";
import {requestInterceptors} from "./axiosInterceptors";
import $store from "@/store"

import {Message} from "element-ui"
import router from "@/router";


const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 100000
});

instance.interceptors.request.use((config) => {

    const token = getStore("token")
    if (token) config.headers['Authorization'] = `token ${token}`
    if (!config.url || !apis[config.url]) return Promise.reject({statusText: "请求路径未定义"});

    config.url = apis[config.url]
    requestInterceptors(config);

    return config
})

instance.interceptors.response.use(
    response => {
        const {status, data} = response;
        if (status !== 200 || (data && data.errorCode !== 0)) {
            if (data.errorCode === 401) {
                $store.dispatch("loginOut");
                router.push("/login")
                Message.error("登录认证失效");
                return Promise.reject(response)
            }

            if (process.env.NODE_ENV !== 'production') Message.error(response.config.url + " " + data.errorMsg || "请求失败")

            return Promise.reject(response)
        }
        return data
    },
    error => {
        return Promise.reject(error.statusText)
    }
)
/**
 * @description 全局网络请求工具
 *     "globals": {
 *       "HTTP": true
 *     },
 */
window.HTTP = {
    /**
     * @description GET 网络请求
     * @param url
     * @param params
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    get(url = "", params = {}) {
        return instance({url, method: 'get', params})
    },
    /**
     * @description GET BY ID 网络请求
     * @param url
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getById(url = "", id = -1) {
        return instance({url, method: 'get-id', params: {id}})
    },
    /**
     * @description GET READONLY 网络请求
     * @param url
     * @param params
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getRead(url = "", params = {}) {
        return instance({url, method: 'get-read', params})
    },
    /**
     * @description GET READONLY BY ID 网络请求
     * @param url
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getReadById(url = "", id = -1) {
        return instance({url, method: 'get-read-id', params: {id}})
    },
    /**
     * @description POST 网络请求
     * @param url
     * @param data
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    post(url = "", data = {}) {
        return instance({url, method: 'post', data})
    },
    /**
     * @description PATCH 网络请求
     * @param url
     * @param data 必须含有id
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    patch(url = "", data = {}) {
        return instance({url, method: 'patch', data})
    },
    /**
     * @description put 网络请求
     * @description 请谨慎使用,将会更新全部字段信息
     * @description 请谨慎使用,将会更新全部字段信息
     * @description 请谨慎使用,将会更新全部字段信息
     * @param url
     * @param data 必须含有id
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    put(url = "", data = {}) {
        return instance({url, method: 'put', data})
    },
    /**
     * @description DELETE 网络请求
     * @param url
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    delete(url = "", id = -1) {
        return instance({url, method: 'delete', data: {id}})
    }
}
