// 导入ParseTime、FormatTime并设置为筛选器
export { parseTime, formatTime } from '@/utils'

/**
 * 如果时间多于数，请输入标签
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
const pluralize = (time, label) => {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export const timeAgo = time => {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时')
  } else {
    return pluralize(~~(between / 86400), ' 天')
  }
}

/**
 * 数字格式化
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export const numberFormatter = (num, digits) => {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export const toThousandFilter = num => {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
