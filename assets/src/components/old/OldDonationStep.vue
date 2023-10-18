<template>
  <div>
    <p>{{ $t("default.stepper.donation.description") }}</p>

    <v-tabs
        color="tertiary"
        centered
        grow
        :vertical="windowWidth <= 450"
    >
      <v-tab class="text-no-transform" @click="updateForm({donation: {type: donationEnum.monthly}})">
        <img class="heart-icon" :src="path + 'img/icons/coeur.svg'" alt="coeur">
        {{ $t("default.stepper.donation.buttons.recurrent") }}
      </v-tab>
      <v-tab class="text-no-transform" @click="updateForm({donation: {type: donationEnum.oneshot}})">
        {{ $t("default.stepper.donation.buttons.unique") }}
      </v-tab>
    </v-tabs>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <donation-block/>
    </v-form>

  </div>
</template>

<script>
import DonationBlock from "@/components/forms/blocks/DonationBlock";
import {mapActions, mapGetters} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import validationMixin from "../../../mixins/validationMixin";
import screenMixin from "@/mixins/screenMixin";
import DonationEnum from "@/enums/donationEnum";

export default {
  name: "donation-step",
  components: {
    DonationBlock
  },
  mixins: [itemTranslationMixin, validationMixin, screenMixin],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      donation: "getDonation",
      path: "getImgPath"
    }),
    donationEnum() {
      return DonationEnum
    }
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    }),
  }
}
</script>

<style lang="scss" scoped>
.v-tabs {
  padding: 2rem 0;
}

.heart-icon {
  width: 20px;
  margin-right: 5px;
}
</style>