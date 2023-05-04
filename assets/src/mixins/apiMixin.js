import axios from "axios";
import {mapGetters} from "vuex";
import {isEmpty} from "lodash";
import {getAuthorizationHeader} from "@/helpers/functionHelper";

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
    post(data, endpoint, headers = {}) {
      return new Promise((resolve, reject) => {
        let url = this.baseUrl + endpoint
        const options = {headers: {...getAuthorizationHeader().headers, ...headers}}
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
    get(data) {
      return new Promise((resolve, reject) => {
        let url = this.getGetUrl(data)
        const options = {...getAuthorizationHeader()}
        axios.get(url, options)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            // console.warn(err)
            reject(err)
          })
      })
    },
    getByUrl(url) {
      return new Promise((resolve, reject) => {
        const options = {...getAuthorizationHeader()}
        axios.get(url, options)
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
      let i = 0;
      Object.keys(params).forEach(key => {
        if (i > 0) {
          url += "&"
        }
        url += key + '=' + params[key]
        i++
      })
      return url;
    },
    getGetUrlNoApiData(params, endpoint) {
      let url = this.baseUrl + endpoint
      if (!isEmpty(params)) {
        url += "?"
      }
      let i = 0;
      Object.keys(params).forEach(key => {
        if (i > 0) {
          url += "&"
        }
        url += key + '=' + params[key]
        i++
      })
      return url;
    }
  }
}
