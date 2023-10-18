<template>
  <div>
    <hint>
      <p class="cg-base-text" v-html="$t('default.stepper.payment.methods.bank.hint')"/>
    </hint>

    <div class="rib-container">
      <div class="d-flex justify-space-between">
        <p class="cg-title">{{$t('default.stepper.payment.methods.bank.title')}}</p>
        <a :href="ribUrl" target="_blank">
          <v-icon color="primary">
            mdi-download
          </v-icon>
        </a>
      </div>
      <p class="cg-base-text" v-html="$t('default.stepper.payment.methods.bank.description')"/>
    </div>

  </div>

</template>

<script>
import Hint from "@/components/utils/Hint.vue";

export default {
  name: "bank-transfer-block",
  components: {Hint},
  computed: {
    ribUrl() {
      return window.location.origin + '/app/uploads/RIB.png'
    }
  }
}
</script>

<style scoped lang="scss">
.rib-container {
  border: 1px solid #DDDDDD;
  padding: 32px;
}
</style>
