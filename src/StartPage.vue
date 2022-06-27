<template>
  <div class="container-fluid master-container" style="max-height: 100vh">
    <div class="row">
      <div class="col-md-8">
        <Map :tables="tables" />
      </div>
      <div class="col-md-4">
        <div class="container-fluid d-flex" v-for="table in tables" :key="table.id">
          <TableCard
            :id="table.id"
            :ports="table.ports"
            :name="table.name"
          />
        </div>
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
    await this.$store.dispatch("loadTables");
    await this.$store.dispatch("loadSnapshots");
    // FIXME: make this production ready
    await this.$store.dispatch("mockWeatherData");
    this.tables = this.$store.getters.tables;
  },
};
</script>

<style>
.container-fluid {
  padding-left: 0% !important;
  min-height: 50%;
}

@media (min-width: 768px) {
  .master-container {
    padding-right: 1% !important;
  }
}

@media (max-width: 767px) {
  .container-fluid {
    padding-right: 0% !important;
  }
}
</style>