<template>
  <Map/>
</template>

<script>
import Map from "./components/OverviewMap.vue"

export default {
  name: "App",
  components: {
    Map
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
