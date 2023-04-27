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
    get(data) {
      return new Promise((resolve, reject) => {
        let url = this.getGetUrl(data)
        axios.get(url)
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
        axios.get(url)
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
    },
    // a implémenter, remplacement des paramètres {uuid} dans les urls
    // replaceParamsEndpointUrl(url, params) {
    //   console.log(url, params)
    //   let parsedUrl = url.split(new RegExp(/{.*?}/))
    //   console.log(parsedUrl)
    // }
  }
}
