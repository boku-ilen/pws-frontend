<template>
  <h1>Park Working Spaces</h1>
  <Intro />
  <h2>Working Spaces</h2>
  <div class="row">
    <div class="col-6" v-for="table in tables" :key="table.id">
      <TableCard :name="table.name" :id="table.id" :ports="table.ports" />
    </div>
  </div>
  <h1>Map</h1>
  <Map :tables="tables" />
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