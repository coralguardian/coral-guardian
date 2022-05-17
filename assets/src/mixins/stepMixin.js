import {mapGetters, mapState, mapActions} from "vuex";

export default {
  computed: {
    ...mapState({
      coralForm: 'data'
    }),
    ...mapGetters({
      step: 'step'
  })
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    })
  }
}