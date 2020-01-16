<template>
  <div id="SystemTime">
    {{ time }}
  </div>
</template>

<script>
import TimerWorker from './timer.worker.js'

export default {
  name: 'SystemTime',
  data() {
    return {
      time: null
    }
  },
  created() {},
  beforeMount() {
    // new Worker(timer)
    // IE9 及以下不支持
    const w = new TimerWorker()
    w.onmessage = ({ data }) => {
      this.time = data.time
    }
  }
}
</script>
