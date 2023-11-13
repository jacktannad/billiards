import * as XLSX from 'xlsx'

export const ExportXlsx = (exportConfig) => {
  const formatSheetData = (list = [], headers = {}) => {
    return list.map(item => {
      const obj = {}
      Object.keys(headers).map(key => {
        obj[headers[key]] = item[key]
      })
      return obj
    })
  }

  const json_data = formatSheetData(exportConfig.list, exportConfig.headers)
  // 创建工作表
  const data = XLSX.utils.json_to_sheet(json_data)
  // 创建工作簿
  const wb = XLSX.utils.book_new()

  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, data, `${exportConfig.sheetName}`)

  wb.Sheets[exportConfig.sheetName]['!cols'] = exportConfig.cols || []

  // 生成文件并下载
  XLSX.writeFile(wb, `${exportConfig.fileName}.xlsx`)
}

/**
 *
 * @param event { any } 文件响应事件
 * @param config{[]} 导入配置
 * @constructor
 */
export const ImportXlsx = (event, config) => {
  return new Promise((resolve, reject) => {
    if (!event || !event.target || !event.target.files || !event.target.files.length) return reject('文件不能为空')

    const file = event.target.files[0]

    const file_type = file.name.match(/\.[^.]+$/)[0]
    if (!['.xls', '.xlsx'].includes(file_type)) return reject('文件类型错误，只能选择 .xls | .xlsx')
    const import_file = {
      name: file.name,
      size: file.size,
      type: file_type,
      sheets: [],
      headers: [],
      data: []
    }

    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = e => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'binary', cellDates: true })

      workbook.SheetNames.map(async(sheetName, sheetIndex) => {
        let sheet_json = []
        let sheet_keys = []
        let out_data = []

        import_file.sheets.push({
          label: sheetName,
          index: sheetIndex,
          value: sheetIndex
        })

        const opts = {}

        if (config && config.length && config[sheetIndex] && config[sheetIndex].headers) {
          opts['header'] = config[sheetIndex].headers
          sheet_json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], opts)
          sheet_json.shift()
          sheet_keys = config[sheetIndex].headers
        } else {
          sheet_json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
          if (sheet_json.length) sheet_keys = Object.keys(sheet_json[0])
        }

        if (config && config.length && config[sheetIndex] && (config[sheetIndex].format || config[sheetIndex].trim)) {
          const list = await handleFormatData(sheet_json, config[sheetIndex])

          console.log('list 00000:', list)
        } else {
          out_data = sheet_json
        }

        import_file.headers.push(sheet_keys)
        import_file.data.push(out_data)

        if (sheetIndex === workbook.SheetNames.length - 1) resolve(import_file)
      })
    }
  })
}

/**
 * 数据列表格式化
 * @param data{Array} 传入需要格式化的数据列表
 * @param config 格式化配置
 * @return Promise{Array} 返回格式化后的数据列表
 */
const handleFormatData = (data = [], config) => {
  return new Promise((resolve) => {
    const format_data = []
    data.map(async(item, index) => {
      const new_item = await formatDataItem(item, config)
      format_data.push(new_item)
      if (index === data.length - 1) resolve(format_data)
    })
  })
}

/**
 * 数据项格式化
 * @param item {Object} 传入需要格式化的数据
 * @param  config 格式化配置
 * @return Promise {Object} 返回格式化后的的数据
 */
const formatDataItem = (item, config) => {
  return new Promise(resolve => {
    const format = config.format || {}
    const item_keys = Object.keys(item)
    const new_obj = {}

    item_keys.map((key_, index) => {
      const key = key_
      let value = item[key_]

      if (format[key]) {
        // 替换格式化
        if (format[key].replace) value = format[key].replace[value]
      }

      // 字符串去除前后的空格
      if (config.trim && config.trim === true && typeof value === 'string') value = value.trim()

      new_obj[key] = value
      if (index === item_keys.length - 1) resolve(new_obj)
    })
  })
}
