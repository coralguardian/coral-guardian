export default {
  data() {
    return {
      windowWidth: null
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
  }
}