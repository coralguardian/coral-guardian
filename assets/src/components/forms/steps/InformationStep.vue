<template>
  <div>
    <hint>
      <span class="cg-base-text">{{ $t("default.stepper.information.description") }}</span>
    </hint>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >

      <text-input
          v-if="isCompany"
          :label="$t('default.stepper.information.' + informationSubstring + 'cols.information.companyName')"
          :rules="[rules.required, rules.minLength]"
          v-model="adopter.company_name"
      />

      <text-input
          v-if="isCompany"
          :label="$t('default.stepper.information.' + informationSubstring + 'cols.information.siret')"
          v-model="adopter.siret"
      />

      <div class="row">
        <text-input
            class="col-6"
            :label="$t('default.stepper.information.' + informationSubstring + 'cols.information.name')"
            :rules="[rules.required, rules.minLength, rules.specialChar]"
            v-model="adopter.last_name"
            icon="mdi-account-outline"
        />

        <text-input
            class="col-6"
            :label="$t('default.stepper.information.' + informationSubstring + 'cols.information.firstname')"
            :rules="[rules.required, rules.minLength, rules.specialChar]"
            v-model="adopter.first_name"
            icon="mdi-account-outline"
        />
      </div>

      <text-input
          :label="$t('default.stepper.information.' + informationSubstring + 'cols.information.mail')"
          :rules="[rules.required, rules.email]"
          v-model="adopter.email"
          icon="mdi-email-outline"
      />

      <text-input
          :label="$t('default.stepper.information.' + informationSubstring + 'cols.contact.address')"
          :rules="[rules.required]"
          v-model="adopter.address"
          icon="mdi-home-outline"
      />

      <div class="row">
        <text-input
            class="col-4"
            :label="$t('default.stepper.information.cols.contact.postalCode')"
            :rules="[rules.required]"
            v-model="adopter.postal_code"
            icon="mdi-home-outline"
        />
        <text-input
            class="col-4"
            :label="$t('default.stepper.information.cols.contact.city')"
            :rules="[rules.required]"
            v-model="adopter.city"
            icon="mdi-home-outline"
        />
        <text-input
            class="col-4"
            id="country-input"
            :label="$t('default.stepper.information.cols.contact.country')"
            :rules="[rules.required, rules.minLength]"
            v-model="adopter.country"
            icon="mdi-home-outline"
        />
      </div>

      <gift-custom-block v-if="isGiftCustom"/>

      <newsletter-block v-model="adopter.wants_newsletter" :full="isCompany"/>

    </v-form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import TextInput from "@/components/utils/TextInput";
import validationMixin from "@/mixins/validationMixin";
import NewsletterBlock from "@/components/forms/blocks/NewsletterBlock";
import apiMixin from "../../../mixins/apiMixin";
import GiftCustomBlock from "../blocks/GiftCustomBlock";
import AdopterEnum from "@/enums/adopterEnum";
import ActionEnum from "@/enums/actionEnum";
import Hint from "@/components/utils/Hint.vue";

export default {
  name: "information-step",
  components: {
    TextInput,
    NewsletterBlock,
    GiftCustomBlock,
    Hint
  },
  mixins: [validationMixin, apiMixin],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      adopter: "getAdopter",
      customerModel: "getCustomerModel",
      order: "getOrder"
    }),
    informationSubstring() {
      return this.isCompany ? "company." : ""
    },
    isCompany() {
      return this.adopter.type === AdopterEnum.company;
    },
    isGiftCustom() {
      return this.order.type === ActionEnum.gift
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    })
  },
  mounted() {
    this.$root.$on(this.validationEventName, () => {
      this.updateForm({
        adopter: this.adopter
      })
    })
    this.$root.$on(this.validationErrorEventName, () => {
      this.$vuetify.goTo('#country-input', {container: '#InformationStep'})
    })
  },
  beforeDestroy() {
    this.$root.$off(this.validationEventName);
    this.$root.$off(this.validationErrorEventName);
  }
}
</script>

<style lang="scss" scoped>
</style>
