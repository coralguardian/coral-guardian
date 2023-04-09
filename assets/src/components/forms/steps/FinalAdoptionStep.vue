<template>
  <div class="text-center final-adoption">
    <div class="image-final-container">
      <img class="" :src="path + '/img/icons/completed.svg'" alt="">
    </div>

    <p class="cg-title">
      {{ $t("default.stepper.finalAdoption.title") }}
    </p>

    <div class="d-inline-block mb-4">
      <hint icon="mdi-check-circle">
        <p class="cg-base-text text-bolder">
          {{ $t("default.stepper.finalAdoption.hint", {count: order.quantity, item: order.productType}) }}
        </p>
      </hint>
    </div>

    <p
        v-if="adoption.type === 'file'"
        v-html="$tc('default.stepper.finalAdoption.description_file', order.quantity, translation)"
    />

    <p
        v-else-if="hasDownloaded"
        v-html="$tc('default.stepper.finalAdoption.description_no_certif', order.quantity)"
    />

    <div v-else>
      <p class="cg-base-text light">{{ $tc('default.stepper.certificate.adoption.email', order.quantity) }}</p>
      <a
          class="cg-btn download-certificate-button"
          target="_blank"
          :href="this.getGetUrl({order_uuid: order.uuid})"
      >
        {{ $t("default.stepper.finalAdoption.download") }}
      </a>
    </div>

    <social-share-block/>
  </div>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import SocialShareBlock from "../blocks/SocialShareBlock";
import {mapGetters} from "vuex";
import validationMixin from "../../../mixins/validationMixin";
import itemTranslationMixin from "../../../mixins/itemTranslationMixin";
import paymentMixin from "../../../mixins/paymentMixin";
import Hint from "@/components/utils/Hint.vue";

export default {
  name: "final-adoption-step",
  components: {
    Hint,
    SocialShareBlock
  },
  mixins: [apiMixin, finalStepMixin, validationMixin, itemTranslationMixin, paymentMixin],
  computed: {
    ...mapGetters({
      hasDownloaded: "hasDownloaded",
      adoption: "getAdoption",
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
.final-adoption {
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

.cg-base-text.light {
  line-height: 25px;
}

.download-certificate-button {
  margin-top: 32px;
  margin-bottom: 32px;
}

</style>
