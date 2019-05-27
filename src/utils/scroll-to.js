Math.easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

// http://goo.gl/sx5sts
const requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60) }
})()

/**
 * @param {number} amount
 * @description 很难发现滚动元素，所以移动它们就行了
 */
const move = amount => {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

const position = () => {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export const scrollTo = (to, duration, callback) => {
  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = (typeof (duration) === 'undefined') ? 500 : duration
  const animateScroll = function() {
    // 增加时间
    currentTime += increment
    // 用二次进出缓和函数求出值
    const val = Math.easeInOutQuad(currentTime, start, change, duration)
    // 移动 document.body
    move(val)
    // 如果尚未结束
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        // 动画结束调用回调函数
        callback()
      }
    }
  }
  animateScroll()
}
