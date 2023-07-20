export default {
  data() {
    return {
      params: {}
    }
  },
  methods: {
    fillParams() {
      new URLSearchParams(window.location.search)
        .forEach((value, key) => {
          this.params[key] = value
        })
    },
    cleanUrl() {
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }
}
