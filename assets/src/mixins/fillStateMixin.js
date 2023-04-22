import {mapActions} from "vuex";
import AdopterEnum from "@/enums/adopterEnum";
import ActionEnum from "@/enums/actionEnum";
import ProjectEnum from "@/enums/projectEnum";
import queryParamsMixin from "@/mixins/queryParamsMixin";

export default {
  mixins: [queryParamsMixin],
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    fillState() {
      this.fillParams()
      let data = {}
      if (this.params.c && AdopterEnum.isValueValid(this.params.c)) {
        data.adopter = {type: this.params.c}
      }
      if (this.params.action && ActionEnum.isValueValid(this.params.action)) {
        data.target = ActionEnum.getTarget(this.params.action)
        const orderType = this.params.action === ActionEnum.gift ? ActionEnum.gift : "regular"
        data.order = {type: orderType}
      }
      if (this.params.project && ProjectEnum.isValueValid(this.params.project)) {
        data.project = this.params.project
      }
      return new Promise(resolve => {
        this.updateForm(data).then(() => resolve())
      })
    }
  }
}
