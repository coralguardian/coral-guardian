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
        primary: "#1B446B",
        secondary: "#EFF0F6",
        tertiary: "#4A3AFF"
      },
    },
  }
}

export default new Vuetify(opts)
