<template>
  <h1>Park Working Spaces</h1>
  <Intro />
  <h2>Map</h2>
  <div class="row justify-content-center">
    <Map :tables="tables" />
  </div>
  <h2>Working Spaces</h2>
  <div class="row justify-content-center">
    <div class="col-4" v-for="table in tables" :key="table.id">
      <TableCard
        :id="table.id"
        :ports="table.ports"
      />
    </div>
  </div>
</template>

<script>
import Intro from "./components/OverviewIntro.vue";
import Map from "./components/OverviewMap.vue";
import TableCard from "./components/TableCard.vue";

export default {
  name: "StartPage",
  components: {
    Intro,
    Map,
    TableCard,
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