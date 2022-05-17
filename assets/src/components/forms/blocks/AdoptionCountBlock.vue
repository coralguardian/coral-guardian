<template>
  <div>

    <v-alert
        v-if="options.displayAlert"
        text
        color="tertiary"
        v-html="options.message"
        class="text-body-2"
    />

    <div class="pa-2">
      <incrementor :options="options" :item="options.item" :big="big"/>
    </div>

    <custom-amount
        v-model="order.price"
        ref="customAmount"
        @input="updateCustomAmount"
    />

    <v-divider class="primary"/>

    <deduction :donation="order.price" :big="big"/>

  </div>
</template>

<script>
import Incrementor from "@/components/utils/Incrementor";
import Deduction from "@/components/utils/Deduction";
import CustomAmount from "@/components/utils/CustomAmount";
import {mapGetters, mapActions, mapState} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "adoption-count-block",
  components: {
    Incrementor,
    Deduction,
    CustomAmount
  },
  mixins: [itemTranslationMixin],
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
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
    }),
    ...mapState({
      baseElementPrice: state => state.data.baseElementPrice
    })
  },
  watch: {
    order: {
      deep: true,
      handler (newVal) {
        this.setMinInput(newVal.quantity * this.baseElementPrice)
      }
    }
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    }),
    updateCustomAmount(value) {
      this.$refs.customAmount.getInput().$data.lazyValue = value
      this.updateForm({order: {price: value, customAmount: true}})
    },
    setMinInput (value) {
      this.$refs.customAmount.setMinInput(value)
    }
  },
  mounted() {
    this.setMinInput(this.order.quantity * this.baseElementPrice)
  }
}
</script>

<style lang="scss" scoped>
.v-divider {
  margin: 1rem 0;
  border-width: 1px;
}

.custom-amount {
  margin-top: -30px;
}

.v-alert {
  margin-bottom: unset;
}
</style>