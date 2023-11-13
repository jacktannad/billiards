/**
 * 格式化Excel表中存储的年月日日期
 * @param {number} num - excel存储的数字
 * @param {string} [format = '-'] - 年月日的间隔符，默认为'-'
 * @returns {string} 格式化后的日期
 */
export function formatExcelDate(num, format = '-') {
  if (!/^\d+$/.test(num)) return null;
  num = parseInt(num)
  let millisecond = 0 // 转化后的毫秒数
  if (num > 60) { // 对大于60的日期进行减1处理
    millisecond = (num - 25568 - 1) * 3600 * 24 * 1000
  } else {
    millisecond = (num - 25568) * 3600 * 24 * 1000
  }
  const date = new Date(millisecond) // 根据转化后的毫秒数获取对应的时间
  const yy = date.getFullYear()
  const m = date.getMonth() + 1
  const mm = m >= 10 ? m : '0' + m
  const d = date.getDate()
  const dd = d >= 10 ? d : '0' + d
  return yy + format + mm + format + dd // 返回格式化后的日期
}
