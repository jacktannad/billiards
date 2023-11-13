import Vue from "vue";

import useLayouts from "./useSetup/useComponents";
import useElementUI from "./useSetup/useElementUI";
import permission from "./directive/permission";

import "./globalErrorHandler/globalErrorHandler"
import "./request/request"

(()=>{
    Vue.use(useLayouts);
    Vue.use(useElementUI);
    Vue.directive("permission",permission);
})()
