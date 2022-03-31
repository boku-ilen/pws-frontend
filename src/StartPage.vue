<template>
  <h1>Map</h1>
  <Map :tables="tables" />
</template>

<script>
import Map from "./components/OverviewMap.vue";

export default {
  name: "StartPage",
  components: {
    Map,
  },

  data() {
    return {
      tables: [],
    };
  },

  async mounted() {
    let tables_req = await fetch(`/tables/all`);
    tables_req.json().then((tables) => {
      this.tables = tables;
    });
  },
};
</script>

<style>
</style>