<template>
  <div class="header">
    <router-link
      :to="{name:'index'}"
      class="logo"
    >
      <img
        src="../assets/images/logo.png"
        style="width:40px; margin-top:8px;"
      >
    </router-link>
    <div class="nav">
      <router-link
        class="checked"
        :to="{name:'giud'}"
      >组件</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  font-family: "Arial", "Microsoft YaHei";
}
.header {
  height: 60px;
  position: relative;
  background: #fff;
  z-index: 2;
  box-shadow: 0 3px 10px 0 #eee;
}
.logo {
  position: absolute;
  left: 35px;
  top: 3px;
}
.nav {
  position: absolute;
  right: 20px;
  top: 0px;
  text-align: right;
}
.nav a {
  display: inline-block;
  font-size: 14px;
  color: #666;
  text-decoration: none;
  line-height: 60px;
  margin-right: 35px;
  position: relative;
  padding: 0 10px;
}
.nav a.checked::before {
  display: none;
  content: "";
  width: 44px;
  height: 12px;
  background: #fff;
  border-radius: 6px;
  position: absolute;
  right: 50%;
  bottom: -6px;
  margin-right: -22px;
  box-shadow: 0 0 10px #ccc;
}
.nav a.checked::after {
  display: none;
  content: "";
  width: 30px;
  height: 4px;
  background: #2487fd;
  border-radius: 6px;
  position: absolute;
  right: 50%;
  bottom: -2px;
  margin-right: -15px;
  box-shadow: 0 0 10px #ccc;
}
</style>