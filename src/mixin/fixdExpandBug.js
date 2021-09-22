export default {
  data() {
    return {
      expandColwidth: 48
    }
  },
  methods: {
    expandChange() {
      // 解决谷歌浏览器下展开表格后导致表格线对不齐问题
      setTimeout(() => {
        this.expandColwidth += 3
        setTimeout(() => {
          this.expandColwidth -= 3
        })
      }, 100)
    }
  }
}
