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
    '[object Object]': 'object'
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
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export const hasClass = (ele, cls) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
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
