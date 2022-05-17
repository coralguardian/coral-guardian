import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      order: 'getOrder',
      defaultTranslation: 'getDefaultTranslation',
      specificTranslation: 'getSpecificTranslation'
    }),
    count() {
      return this.order.quantity
    },
    translation () {
      return {item: this.$tc(this.defaultTranslation, this.count)};
    },
    singular () {
      return {item: this.$tc(this.defaultTranslation, 1)};
    },
    plural () {
      return {item: this.$tc(this.defaultTranslation, 2)};
    },
    specific () {
      return {item: this.$tc(this.specificTranslation, this.count)};
    }
  }
}