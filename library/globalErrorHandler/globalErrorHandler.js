import Vue from 'vue'

Vue.config.warnHandler = function (msg, vm, trace) {
    console.error("VUE全局异常拦截：",msg)
    console.error(trace)
}

window.onerror = function (message, source, line, column, error) {
    console.error("全局异常拦截 Window")
    console.error("message:", message)
    console.error("source:", source)
    console.error("line:", line)
    console.error("column:", column)
    console.error("error:", error)
}
