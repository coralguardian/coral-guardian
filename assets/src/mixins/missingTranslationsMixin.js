// import fr from '@/locales/fr'
// import en from "@/locales/en"

export default {
  data() {
    return {
      missingTranslations: {}
    }
  },
  mounted() {
    // this.missingTranslations = this.compare(fr, en)
    // this.download()
  },
  methods: {
    compare(one, two) {
      let translationObject = {}
      for (let key in one) {
        if (typeof one[key] === "object") {
          translationObject[key] = this.compare(one[key], typeof two[key] === "object" ? two[key] : {})
        } else if (two && !Object.getOwnPropertyDescriptor(two, key)) {
          translationObject[key] = two[key]
        } else {
          translationObject[key] = one[key]
        }
      }
      return translationObject
    },
    download() {
      const data = JSON.stringify(this.missingTranslations)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
      a.download = "missingTranslations.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  }
}
