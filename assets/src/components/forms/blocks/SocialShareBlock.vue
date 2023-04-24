<template>
  <div id="social-share" class="my-5">

    <span class="cg-base-text">{{$t('default.share')}}</span>

    <a class="linkedin" target="_blank" :href="'https://www.linkedin.com/sharing/share-offsite/?url=' + sharingUrl">
      <img :src="path + '/img/social/linkedin.svg'" alt="">
      <span class="cg-base-text">Linkedin</span>
    </a>

    <a class="facebook" target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u=' + sharingUrl">
      <img :src="path + '/img/social/facebook.svg'" alt="">
      <span class="cg-base-text">Facebook</span>
    </a>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "social-share-block",
  computed: {
    ...mapGetters({
      path: "getImgPath"
    }),
    sharingUrl() {
      return window.location.origin + "/adopte-corail/"
    }
  }
}
</script>

<style scoped lang="scss">

#social-share {
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

a {
  padding: 5px;
  display: flex;
  align-items: center;
  text-decoration: none;
}

img {
  width: 18px;
  height: 18px;
  margin-right: 15px;
}

</style>
