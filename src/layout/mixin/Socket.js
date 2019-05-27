// import store from '@/store'
// import io from 'socket.io-client'

export default {
  data() {
    return {
      socket: null
    }
  },
  beforeMount() {
    // this.socket = io(process.env.VUE_APP_SOCKET_URL)
    // this.socket.on('news', (data) => {
    //   console.log(data)
    // })
    // this.socket.emit('listen:client', { username: 'xxx' })
    // console.log(this.socket)
    // setTimeout(() => {
    //   // this.socket.disconnect()
    //   // this.socket.connect()
    // }, 3000)

    // this.socket.on('connect', data => {
    //   console.log('上线了')
    // })
    // this.socket.on('disconnect', data => {
    //   console.log('下线了')
    // })
  },
  beforeDestroy() {

  },
  mounted() {

  }
}
