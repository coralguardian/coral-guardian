import adoptionHelper from "@/helpers/adoptionHelper";

export default {
  data () {
    return {
      adoptionConstants: {
        me: adoptionHelper.me,
        friend: adoptionHelper.friend,
        offered: adoptionHelper.offered
      },
      reef: adoptionHelper.reef
    }
  }
}