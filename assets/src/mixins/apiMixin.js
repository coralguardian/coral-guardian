import axios from "axios";
import {mapGetters} from "vuex";
import {isEmpty} from "lodash";

export default {
  computed: {
    ...mapGetters({
      apiData: "getApiData",
      apiNameSpace: "getApiNamespace"
    }),
    apiEventName() {
      return this.$options._componentTag + 'Api'
    },
    baseUrl() {
      return "/wp-json/" +  this.apiNameSpace + "/"
    }
  },
  methods: {
    post(data, endpoint, options) {
      return new Promise((resolve, reject) => {
        let url = this.baseUrl + endpoint
        // console.log(data, url)
        axios.post(url, data, options)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            this.$root.$emit('IsLoaded')
            this.$root.$emit('displayError')
            // console.warn(err)
            reject(err)
          })
      })
    },
    get(data, endpoint) {
      return new Promise((resolve, reject) => {
        let url = this.baseUrl + endpoint
        // console.log(data, url)
        axios.get(url, data)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            // console.warn(err)
            reject(err)
          })
      })
    },
    getGetUrl(params) {
      if (!this.apiData) {
        console.error("Pas de données API dans l'étape en cours.")
        return;
      }
      let url = this.baseUrl + this.apiData.endpoint
      if (!isEmpty(params)) {
        url += "?"
      }
      Object.keys(params).forEach(key => {
        url += key + '=' + params[key]
      })
      return url;
    },
    getGetUrlNoApiData(params, endpoint) {
      let url = this.baseUrl + endpoint
      if (!isEmpty(params)) {
        url += "?"
      }
      Object.keys(params).forEach(key => {
        url += key + '=' + params[key]
      })
      return url;
    }
  }
}