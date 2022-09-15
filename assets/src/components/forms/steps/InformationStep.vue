<template>
  <div>
    <p>{{ $t("default.stepper.information.description") }}</p>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >

      <div class="row">

        <div class="col-6">
          <p class="subtitles poppins-police">
            {{ $t("default.stepper.information.cols.information.title") }}
          </p>

          <text-input
              v-if="isCompany"
              :placeholder="$t('default.stepper.information.' + informationSubstring + 'cols.information.companyName')"
              :rules="[rules.required, rules.minLength]"
              v-model="adopter.company_name"
          />

          <text-input
              :placeholder="$t('default.stepper.information.' + informationSubstring + 'cols.information.firstname')"
              :rules="[rules.required, rules.minLength, rules.specialChar]"
              v-model="adopter.first_name"
          />

          <text-input
              :placeholder="$t('default.stepper.information.' + informationSubstring + 'cols.information.name')"
              :rules="[rules.required, rules.minLength, rules.specialChar]"
              v-model="adopter.last_name"
          />

          <text-input
              :placeholder="$t('default.stepper.information.' + informationSubstring + 'cols.information.mail')"
              :rules="[rules.required, rules.email]"
              v-model="adopter.email"
          />

        </div>

        <div class="col-6">
          <p class="subtitles poppins-police">
            {{ $t("default.stepper.information.cols.contact.title") }}
          </p>

          <text-input
              :placeholder="$t('default.stepper.information.' + informationSubstring + 'cols.contact.address')"
              :rules="[rules.required]"
              v-model="adopter.address"
          />

          <div class="double-input-container" v-if="!isCompany">
            <div class="double-input-item">
              <text-input
                  :placeholder="$t('default.stepper.information.cols.contact.postalCode')"
                  :rules="[rules.required]"
                  v-model="adopter.postal_code"
              />
            </div>
            <div class="double-input-item">
              <text-input
                  :placeholder="$t('default.stepper.information.cols.contact.city')"
                  :rules="[rules.required]"
                  v-model="adopter.city"
              />
            </div>
          </div>

          <!--en mode entreprise on place les champs sur 2 lignes-->
          <text-input
              v-if="isCompany"
              :placeholder="$t('default.stepper.information.cols.contact.postalCode')"
              :rules="[rules.required]"
              v-model="adopter.postal_code"
          />
          <text-input
              v-if="isCompany"
              :placeholder="$t('default.stepper.information.cols.contact.city')"
              :rules="[rules.required]"
              v-model="adopter.city"
          />

          <text-input
              id="country-input"
              :placeholder="$t('default.stepper.information.cols.contact.country')"
              :rules="[rules.required, rules.minLength]"
              v-model="adopter.country"
          />

        </div>

        <div class="col-12" v-if="isGiftCustom">
          <gift-custom-block/>
        </div>

        <div class="col-12">
          <newsletter-block v-model="adopter.wants_newsletter" :full="isCompany"/>
        </div>

      </div>
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

export default {
  name: "information-step",
  components: {
    TextInput,
    NewsletterBlock,
    GiftCustomBlock
  },
  mixins: [validationMixin, apiMixin],
  props: {
    isGiftCustom: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      adopter: "getAdopter",
      customerModel: "getCustomerModel"
    }),
    informationSubstring() {
      return this.isCompany ? "company." : ""
    },
    isCompany() {
      return this.adopter.type === AdopterEnum.company;
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
    this.$root.$on(this.apiEventName, () => {
      this.post(this.customerModel, this.apiData.endpoint)
          .then((resp) => {
            this.updateForm({
              adopter: {id: resp.data.uuid}
            }).then(() => this.$root.$emit('ApiValid'))
          })
    })
    this.$root.$on(this.validationErrorEventName, () => {
      this.$vuetify.goTo('#country-input', {container: '#InformationStep'})
    })
  },
  beforeDestroy() {
    this.$root.$off(this.validationEventName);
    this.$root.$off(this.apiEventName);
    this.$root.$off(this.validationErrorEventName);
  }
}
</script>

<style lang="scss" scoped>
</style>