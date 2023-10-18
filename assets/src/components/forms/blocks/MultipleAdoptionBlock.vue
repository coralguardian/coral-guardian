<template>
  <div class="adoptions">
    <hint>
      <p class="cg-base-text"
         v-html="$tc('default.stepper.namingAdoption.description.' + project, order.quantity, translation)"/>
    </hint>
    <v-row v-if="adoption.type !== null">
      <v-col
          cols="6"
          v-for="n in order.quantity"
          :key="n"
      >
        <adoption-name-block
            v-model="adoption.names[n-1]"
            :n="n"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import multipleAdoptionMixin from "@/mixins/multipleAdoptionMixin";

export default {
  name: "multiple-adoption-block",
  mixins: [multipleAdoptionMixin],
}
</script>

<style lang="scss" scoped>
</style>
