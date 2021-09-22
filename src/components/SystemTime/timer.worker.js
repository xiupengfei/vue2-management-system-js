import { parseTime } from '@/utils'

setInterval(function() {
  postMessage({ time: parseTime(new Date(), '{h}:{i}:{s}') })
}, 1000)
postMessage({ time: parseTime(new Date(), '{h}:{i}:{s}') })
