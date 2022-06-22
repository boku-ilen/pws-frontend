<template>
  <h1>Park Working Spaces</h1>
  <Intro />
  <div class="row">
    <div class="col-sm-6">
      <Map :tables="tables" />
    </div>
    <div class="col-sm-4">
      <div v-for="table in tables" :key="table.id">
        <TableCard
          :id="table.id"
          :ports="table.ports"
          :name="table.name"
        />
      </div>
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
      console.log(tables)
    });
  },
};
</script>

<style>
</style>