<template>
  <div class="text-center final-step" id="FinalStep">
    <div class="image-final-container">
      <img class="" :src="path + '/img/icons/completed.svg'" alt="">
    </div>

    <p class="cg-title">
      {{ $t("default.stepper.finalStep.title") }}
    </p>

    <div class="d-inline-block mb-4">
      <hint icon="mdi-check-circle">
        <p class="cg-base-text text-bolder">
          <slot name="hint"/>
        </p>
      </hint>
    </div>

    <slot/>

    <social-share-block/>
  </div>
</template>

<script>
import SocialShareBlock from "../blocks/SocialShareBlock";
import {mapGetters} from "vuex";
import Hint from "@/components/utils/Hint.vue";
import apiMixin from "@/mixins/apiMixin";
import paymentCheckMixin from "@/mixins/paymentCheckMixin";

export default {
  name: "final-step",
  mixins: [apiMixin, paymentCheckMixin],
  components: {
    Hint,
    SocialShareBlock
  },
  computed: {
    ...mapGetters({
      path: "getImgPath"
    })
  },
  mounted() {
    this.cleanLocalStorage()
    this.$root.$on(this.apiEventName, () => this.$root.$emit('ApiValid'))
  },
  beforeDestroy() {
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style scoped lang="scss">
.final-step {
  width: 80%;
  margin: auto;
  padding: 24px 0;
}

.image-final-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  img {
    width: 140px;
    height: 140px;
  }
}

</style>
