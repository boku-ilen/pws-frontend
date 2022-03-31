<template>
  <Intro/>
  <ul>
    <li> Kojak </li>
    <li> Kajak </li>
    <li> Annorak </li>
    <li> Ananas </li>
  </ul>
  <Map/>
</template>

<script>
import Map from "./components/OverviewMap.vue"
import Intro from "./components/OverviewIntro.vue"

export default {
  name: "App",
  components: {
    Map,
    Intro
  }
}
</script>

<style>
@import '~mdb-ui-kit/css/mdb.min.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
