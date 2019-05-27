/**
 * 验证工具函数
 */
import { typeOf } from './index'

/**
 * @param {string} path
 * @returns {Boolean}
 * @description 验证是否是外链接
 */
export const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path)

/**
 * @param {string} url
 * @returns {Boolean}
 * @description 验证是否是有效URL
 */
export const validURL = url => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * @description 验证是否是全小写字母
 */
export const validLowerCase = str => /^[a-z]+$/.test(str)

/**
 * @param {string} str
 * @returns {Boolean}
 * @description 验证是否是全大写字母
 */
export const validUpperCase = str => /^[A-Z]+$/.test(str)

/**
 * @param {string} str
 * @returns {Boolean}
 * @description 验证是否字母表
 */
export const validAlphabets = str => /^[A-Za-z]+$/.test(str)

/**
 * @param {string} email
 * @returns {Boolean}
 * @description 验证是否是有效邮箱
 */
export const validEmail = email => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export const isString = str => typeOf(str) === 'string'

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export const isArray = arg => typeOf(arg) === 'array'

/**
 * @param {String} str
 * @returns {Boolean}
 */
export const isPhoneNumber = str => /^1[34578]\d{9}$/.test(str)
