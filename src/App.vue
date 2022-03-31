<template>
  <Intro />
  <ul>
    <li>Kojak</li>
    <li>Kajak</li>
    <li>Annorak</li>
    <li>Ananas</li>
  </ul>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
