// 日期加一天
export const addOneDay = (date) => {
  if (date) {
    const d = new Date(date)
    d.setDate(d.getDate() + 1)
    const dt = addEightHours(d)
    return new Date(dt)
  } else {
    return null
  }
}

// 日期加8小时
export const addEightHours = (date) => {
  if (date) {
    const d = new Date(date)
    d.setHours(d.getHours() + 8)
    return new Date(d)
  } else {
    return null
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof (time) == 'string' && time.indexOf('/')) {
    time = time.replace(/-/g, '/')
    time = time.replace(/T/g, ' ')
    time = time.replace(/\.+\d{0,6}/, '')
  }
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
