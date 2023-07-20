<template>
  <div class="icon-container">
    <img class="cg-icon" :src="fullPath" alt="">
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "icon",
  props: {
    iconPath: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      path: "getImgPath"
    }),
    fullPath() {
      return this.path + this.iconPath
    }
  }
}
</script>

<style lang="scss">
.icon-container {
  width: 66px;
  height: 66px;
  border-radius: 100%;
  background: rgba(74, 58, 255, 0.15);
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  .cg-icon {
    width: 35px;
  }
}
</style>
