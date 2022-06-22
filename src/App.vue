<template>
  <router-view />
</template>

<script>
import Intro from "./components/OverviewIntro.vue";

export default {
  name: "App",
  components: {
    Intro,
  },
};
</script>

<style>
@font-face {
  font-family: "DMSans";
  src: URL("./assets/DMSans-Regular.ttf") format("truetype");
}

#app {
  font-family: "DMSans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
