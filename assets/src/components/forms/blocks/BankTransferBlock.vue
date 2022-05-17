<template>
  <div class="text-left">
    <div class="row">
      <div class="col-12">
        <p>{{$t('default.stepper.payment.methods.bank.description')}}</p>
      </div>
      <div class="col-12">
        <v-btn color="secondary" :href="ribUrl" target="_blank">
          {{$t('default.stepper.payment.methods.bank.button')}}
        </v-btn>
      </div>
      <div class="col-12">
        <p class="font-weight-bold" v-html="$t('default.stepper.payment.methods.bank.hint')"/>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "bank-transfer-block",
  computed: {
    ribUrl() {
      return window.location.origin + '/app/uploads/RIB.png'
    }
  }
}
</script>

<style scoped>

</style>