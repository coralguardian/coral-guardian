import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import Hint from "@/components/utils/Hint.vue";
import AdoptionNameBlock from "@/components/forms/blocks/AdoptionNameBlock.vue";
import {mapGetters} from "vuex";

export default {
  mixins: [itemTranslationMixin],
  components: {
    Hint,
    AdoptionNameBlock,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      adoption: "getAdoption",
      order: "getOrder",
      adopter: "getAdopter",
      project: "getProject"
    }),
  },
  methods: {
  },
  mounted() {
  }
}
