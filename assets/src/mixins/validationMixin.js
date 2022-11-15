import i18n from "@/plugins/i18n";

export default {
  data () {
    return {
      valid: false,
      minLength: 2,
      min: 0,
      rules: {
        required: value => !!value || i18n.t('default.rules.required'),
        notNull: value => value !== null,
        minLength: value => !!value && value.length >= this.minLength || i18n.t('default.rules.minLength', {count: this.minLength}),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || i18n.t('default.rules.email')
        },
        specialChar: value => {
          const pattern = /^[a-zA-Z0-9éèêîôûàïëöñç '&/.-]+$/
          return pattern.test(value) || i18n.t('default.rules.specialChar')
        },
        message: value => {
          const pattern = /^[a-zA-Z0-9éèêîôûàïëöñç ,&€$'.?!-)/(]+$/
          return pattern.test(value) || i18n.t('default.rules.specialChar')
        },
        digitOnly: value => {
          const pattern = /^[0-9+]+$/
          return pattern.test(value) || i18n.t('default.rules.digitOnly')
        },
        minValue: value => {
          return Number(value) >= this.min || i18n.t('default.rules.minValue', {min: this.min})
        }
      }
    }
  },
  computed: {
    validationEventName () {
      return this.$options._componentTag + 'Validation'
    },
    validationErrorEventName () {
      return this.$options._componentTag + 'ValidationError'
    },
    formRefName () {
      return this.$options._componentTag + 'Form'
    },
    customValidationEventName() {
      return this.$options._componentTag + "CustomValid"
    }
  },
  methods: {
    setMinLengthRule(minLength) {
      this.minLength = minLength
    },
    validForm () {
      if (this.$refs[this.formRefName] && this.$refs[this.formRefName].validate()) {
        this.$root.$emit('StepValid')
      } else {
        this.$root.$emit(this.validationErrorEventName)
        this.$root.$emit('IsLoaded')
      }
    }
  },
  mounted() {
    this.$root.$on(this.validationEventName, (custom = false) => {
      if (custom) {
        this.$root.$emit(this.customValidationEventName)
      } else {
        this.validForm()
      }
    })
  },
  beforeDestroy () {
    this.$root.$off(this.validationEventName)
  }
}
