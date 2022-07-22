// import fr from '../locales/fr'
// import en from "../locales/en"

import {merge} from "lodash"

export default {
  mounted() {
    // this.compare(fr, en)
  },
  methods: {
    compare(one, two) {
      merge(one, two)
      const data = JSON.stringify(one)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
      a.download = "test.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  }
}