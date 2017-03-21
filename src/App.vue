<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "assets/scss/reset";
@import "assets/scss/icons";
</style>
<style>
body {
    background-color: #f1f4f8;
}
#app {
    font-family: Microsoft Yahei, 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
