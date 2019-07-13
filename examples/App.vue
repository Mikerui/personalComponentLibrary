<template>
  <div id="app">
    <main-header></main-header>
    <div
      class="content"
      v-if="!isIndex"
    >
      <main-menu></main-menu>
      <router-view class="view" />
    </div>
    <router-view
      class="page"
      v-else
    ></router-view>
  </div>
</template>

<script>
import MainHeader from "./components/Header.vue";
import MainMenu from "./components/Menu.vue";
export default {
  name: "App",
  components: {
    MainHeader,
    MainMenu
  },
  data() {
    return {
      isIndex: true
    };
  },
  watch: {
    $route() {
      this.isIndex = this.$route.name === "Home";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
// @import "./assets/styles/index";
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #efefef;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 0;
  background: #fff;
  z-index: 1;
  display: flex;
  margin: 30px;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
}
.content .view {
  position: absolute;
  left: 220px;
  top: 20px;
  right: 0px;
  bottom: 20px;
  overflow: auto;
  padding: 0 40px;
  overflow-x: hidden;
}
</style>