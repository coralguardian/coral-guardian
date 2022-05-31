import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#DDE8EE",
        secondary: "#E3FE93",
        tertiary: "#00456e"
      },
    },
  }
}

export default new Vuetify(opts)