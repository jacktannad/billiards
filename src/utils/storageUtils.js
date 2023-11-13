export const setStore = (key = "", value) => {
    let value_ = value

    try {
        if (typeof value_ === 'object') value_ = JSON.stringify(JSON.parse(JSON.stringify(value_)));
    } catch (e) {
        console.log("setStore error:", e)
    }

    localStorage.setItem(key, value_)
}

export const getStore = (key = "", isObj = false) => {

    if (!key) return isObj ? {} : null;

    const item = localStorage.getItem(key);

    if (["", "null", "undefined", undefined].includes(item)) return isObj ? {} : null;

    try {
        if (isObj) return JSON.parse(item);
    } catch (e) {
        console.log("getStore error:", e)
        return {}
    }

    return item;
}