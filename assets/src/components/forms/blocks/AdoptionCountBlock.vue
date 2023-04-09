<template>
  <div>

    <v-alert
        v-if="options.displayAlert"
        text
        color="tertiary"
        v-html="options.message"
        class="text-body-2"
    />

    <v-row>
      <v-col cols="6">
        <text-input
            :value="order.quantity"
            :label="$t('default.stepper.adoption.quantity.label')"
            type="number"
            @input="updateQuantity($event)"
            :min="1"
            :rules="[rules.minValue, rules.required]"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <custom-amount
            v-model="order.price"
            ref="customAmount"
            @input="updateCustomAmount"
            :minAmount="order.price"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CustomAmount from "@/components/utils/CustomAmount";
import {mapGetters, mapActions} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import TextInput from "@/components/utils/TextInput.vue";
import validationMixin from "@/mixins/validationMixin";

export default {
  name: "adoption-count-block",
  components: {
    TextInput,
    CustomAmount
  },
  mixins: [itemTranslationMixin, validationMixin],
  props: {
    options: {
      type: Object,
      required: true
    },
    big: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
    })
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm',
      setQuantity: 'setQuantity'
    }),
    updateCustomAmount(value) {
      this.updateForm({order: {price: value, customAmount: true}})
    },
    updateQuantity(value) {
      this.setQuantity(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-divider {
  margin: 1rem 0;
  border-width: 1px;
}

.v-alert {
  margin-bottom: unset;
}
</style>
