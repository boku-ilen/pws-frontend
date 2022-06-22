<template>
  <div v-if="loaded">
    <h1>Arbeitsplatz {{ table.name }}</h1>
    <table-detail-description />
    <table-detail-figure />
  </div>
</template>

<script>
import TableDetailDescription from './components/TableDetailDescription.vue';
import TableDetailFigure from './components/TableDetailFigure.vue';
export default {
  components: { TableDetailDescription, TableDetailFigure },
  data: function () {
    return {
      loaded: false,
      number_of_total_usb: 0,
      number_of_total_qi: 0,
      number_of_free_usb: 0,
      number_of_free_qi: 0,
      table_type: this.$route.params.id,
      table: {},
      latest: {},
    };
  },

  async mounted() {
    let table_req = await fetch(`/tables/` + this.table_type);
    table_req.json().then(async (table) => {
      this.table = table;

      let latest_req = await fetch(`/tables/latest/` + this.table_type);
      latest_req.json().then((latest) => {
        this.latest = latest;

        // Count number of (free) ports
        for (const [id, discharge] of this.latest["port_usage"].entries()) {
          if (table.ports[id] == "USB") {
            this.number_of_total_usb += 1;

            if (discharge < 0.1) {
              this.number_of_free_usb += 1;
            }
          } else {
            this.number_of_total_qi += 1;

            if (discharge < 0.1) {
              this.number_of_free_qi += 1;
            }
          }
        }

        // Now that we have all data, we can display the HTML elements
        this.loaded = true;
      });
    });
  },
};
</script>

<style>
</style>