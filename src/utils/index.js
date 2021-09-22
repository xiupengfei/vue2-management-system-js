/**
 * 工具函数
 * @description 工具函数
 */
import { storageLevel } from '@/settings'

/**
 * @param {object} obj
 * @return {string}
 * @description 获取数据类型
 */

export const typeOf = (obj) => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Blob]': 'blob'
  }
  return map[toString.call(obj)]
}

/**
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 * @description 解析时间成字符串
 */
export const parseTime = (time = null, cFormat = null) => {
  if (time === null) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeOf(time) === 'object') {
    date = time
  } else {
    if ((typeOf(time) === 'string') && (/^[0-9]+$/.test(time))) {
      time = Number.parseInt(time)
    }
    if ((typeOf(time) === 'number') && (time.toString().length === 10)) {
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
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // 周日返回 0
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 * @description 格式化时间
 */
export const formatTime = (time, option) => {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 * @description 合并两个对象，使最后一个对象优先
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {Object} source
 * @returns {Object}
 * @description 深拷贝
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 * @description 数组去重
 */
export function uniqueArr(arr) {
  return [...new Set(arr)]
}

/**
 * @returns {string}
 * @description 获取一个随机唯一字符串
 */
export const createUniqueString = () => {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * @param {string} key
 * @param {object} val
 * @description 本地缓存数据写入
 */

export const SetStorate = (key, val) => {
  try {
    window[`${storageLevel}Storage`].setItem(key, JSON.stringify(val))
  } catch (e) {
    //
  }
}

/**
 * @param {string} key
 * @return {object}
 * @description 本地缓存数据读取
 */

export const GetStorate = (key) => {
  const value = window[`${storageLevel}Storage`].getItem(key)
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

/**
 * @param {string} key
 * @description 本地缓存数据清除
 */
export const ClearStorate = (key) => window[`${storageLevel}Storage`].removeItem(key)

/**
 * @param {string} key
 * @description 本地缓存数据全部清除
 */
export const ClearAllStorate = () => window[`${storageLevel}Storage`].clear()

/**
 * @param {string} href
 * @description 文件下载
 */
export const DownloadFile = (href = '', filename = 'template') => {
  let src = ''
  if (typeOf(href === 'blob')) {
    src = URL.createObjectURL(new Blob([href], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }))
    // URL.revokeObjectURL(href)
  } else {
    src = process.env.VUE_APP_SERVER_URL + href
  }
  const win = document.getElementById('iframe').contentWindow
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = src
  // link.setAttribute('download', '')
  link.download = `${filename}.xlsx`
  win.document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    win.document.body.removeChild(link)
  }, 1000)
}

// export const DownloadFile = (href = '') => {
//   const win = document.createElement('iframe')
//   const winWrap = document.createElement('div')
//   win.src = process.env.VUE_APP_SERVER_URL + href
//   winWrap.style.width = 0
//   winWrap.style.height = 0
//   winWrap.style.overflow = 'hidden'
//   winWrap.appendChild(win)
//   document.body.appendChild(winWrap)
//   setTimeout(() => {
//     document.body.removeChild(winWrap)
//   }, 1000)
// }

/**
 * @param {number} numb
 * @description 读取Excel日期，读取的是期距离1900年1月1日的天数，因此需要转换
 */

export const excelDate2Timestamp = (numb) => {
  if (!Number.isInteger(numb)) {
    return null
  }
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() + ''
  return new Date(`${year}-${month}-${date}`).getTime()
}

/**
 * @param {date} d
 * @description 获取指定年月天数，默认当月
 */

export const countDates = d => {
  let date = null
  if (d) {
    date = new Date(d)
  } else {
    date = new Date()
  }
  const day = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return day.getDate()
}

/**
 * @param {date} date1
 * @param {date} date2
 * @description 获取指定月之间 工作日天数，默认当月
 */

const _date = new Date()
const _startDay = parseTime(_date, '{y}-{m}-01')
const _today = parseTime(_date, '{y}-{m}-{d}')

export const countWorkDays = (date1 = _startDay, date2 = _today) => {
  date1 = new Date(date1)
  date2 = new Date(date2)
  const delta = (date2 - date1) / (1000 * 60 * 60 * 24) + 1
  let weekEnds = 0
  if (delta < 0) {
    for (let i = delta; i < 0; i++) {
      if (date1.getDay() === 0 || date1.getDay() === 6) {
        weekEnds++
      }
      date1 = date1.valueOf()
      date1 -= 1000 * 60 * 60 * 24
      date1 = new Date(date1)
    }
    return Number.parseInt(delta + weekEnds)
  } else {
    for (let i = 0; i < delta; i++) {
      if (date1.getDay() === 0 || date1.getDay() === 6) {
        weekEnds++
      }
      date1 = date1.valueOf()
      date1 += 1000 * 60 * 60 * 24
      date1 = new Date(date1)
    }
    return Number.parseInt(delta - weekEnds)
  }
}

/**
 * @param {Object} json
 * @returns {String}
 */
export const obj2Params = (json) => {
  if (!json) return ''
  const L = Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    if (typeOf(json[key]) === 'array') {
      const tmp = json[key].map(item => {
        return `${key}[]=` + encodeURIComponent(item)
      })
      return tmp.join('&')
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  })
  return L.join('&')
}
