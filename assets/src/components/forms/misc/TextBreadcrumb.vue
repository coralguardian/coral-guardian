<template>
  <p class="cg-base-text text-breadcrumb" v-html="fullText"/>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "text-breadcrumb",
  computed: {
    ...mapGetters({
      order: 'getOrder',
      adopter: 'getAdopter',
      project: 'getProject',
      donation: 'getDonation',
      productTranslation: "getDefaultTranslation"
    }),
    fullText() {
      if (this.order.price) {
        let text = this.$t('default.breadcrumb.price',
          {
            type: this.$t('default.breadcrumb.types.' + this.order.type),
            project: this.$t('default.stepper.project.' + this.project),
            product: this.$tc(this.productTranslation, this.order.quantity),
            price: this.order.price,
            quantity: this.order.quantity
          }
        )

        if (this.donation.price > 0) {
          text += "<br>" +this.$t('default.breadcrumb.monthlyDonation', {donation: this.donation.price})
        }

        return text;
      }
      if (this.order.productType) {
        return this.$t('default.breadcrumb.project',
          {
            type: this.$t('default.breadcrumb.types.' + this.order.type),
            project: this.$t('default.stepper.project.' + this.project),
            product: this.$tc(this.productTranslation, 1),
          }
        )
      }
      if (this.project && this.order.type) {
        return this.$t('default.breadcrumb.project',
          {
            type: this.$t('default.breadcrumb.types.' + this.order.type),
            project: this.$t('default.stepper.project.' + this.project)
          }
        )
      }
      if (this.order.type ) {
        return this.$t('default.breadcrumb.base', {type: this.$t('default.breadcrumb.types.' + this.order.type)})
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.text-breadcrumb {
  color: #6F6C90;
  margin-bottom: 10px;
  line-height: 30px;
}
</style>
