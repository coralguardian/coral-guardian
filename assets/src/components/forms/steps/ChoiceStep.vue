<template>
  <div class="d-flex flex-column justify-space-around form-starter">

    <transition name="fade">
      <v-alert
          v-if="showTooltip"
          class="tooltip white--text"
          color="#28335f"
      >{{ tooltip }}
      </v-alert>
    </transition>

    <choice-btn
        :text="$t('default.stepper.choice.buttons.me.text', singular)"
        :tooltip="$t('default.stepper.choice.buttons.me.tooltip', plural)"
        @openForm="openForm({target: adoptionConstants.me, adoption: {type: 'direct'}})"
        @showTooltip="displayTooltip"
        @hideTooltip="showTooltip = false"
    />

    <choice-btn
        :text="$t('default.stepper.choice.buttons.friend.text', singular)"
        :tooltip="$t('default.stepper.choice.buttons.friend.tooltip', plural)"
        @openForm="openForm({target: adoptionConstants.friend, adoption: {type: 'gift'}})"
        @showTooltip="displayTooltip"
        @hideTooltip="showTooltip = false"
    />

    <a
        class="black--text text-capitalize-first"
        :href="companyUrl"
    >
      {{ $t("default.stepper.choice.buttons.company", singular) }}
    </a>

  </div>
</template>

<script>
import stepMixin from "@/mixins/stepMixin";
import adoptionMixin from "@/mixins/adoptionMixin";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import ChoiceBtn from "@/components/utils/ChoiceBtn";

export default {
  name: "choice-step",
  components: {ChoiceBtn},
  mixins: [stepMixin, adoptionMixin, itemTranslationMixin],
  data() {
    return {
      tooltip: "",
      showTooltip: false
    }
  },
  computed: {
    companyUrl() {
      return window.location.origin + (this.$i18n.locale === 'fr' ? '/entreprise' : '/company')
    }
  },
  methods: {
    openForm(data) {
      this.updateForm(data).then(() => {
        this.updateForm({step: 1})
      })
    },
    displayTooltip(tooltip) {
      this.tooltip = tooltip
      this.showTooltip = true
    }
  }
}
</script>

<style lang="scss" scoped>
.form-starter {
  padding: 2rem 1rem 0;
  height: calc(#{$form-height} - 150px);
}

a.text-capitalize-first {
  font-size: 14px;
}
</style>