<template>
  <div id="social-share" class="d-flex justify-space-around my-5">
    <a class="facebook" target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u=' + sharingUrl">
      <img :src="path + '/img/social/facebook.png'" alt="">
      <span>Partager</span>
    </a>
    <a class="linkedin" target="_blank" :href="'https://www.linkedin.com/sharing/share-offsite/?url=' + sharingUrl">
      <img :src="path + '/img/social/linkedin.png'" alt="">
      <span>Partager</span>
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
}

a {
  padding: 5px;
  display: flex;
  align-items: center;
  text-decoration: none;

  span {
    color: white;
    font-weight: bold;
    font-size: 0.65em;
  }
}

img {
  width: 35px;
  height: 35px;
  margin-right: 5px;
}

.linkedin {
  background: #0073b1;
}

.facebook {
  background: #1877f2;
}
</style>