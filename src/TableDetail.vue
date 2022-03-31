<template>
  <div v-if="loaded">
    <h1>ParkWorkingSpace {{ table.name }}</h1>
    <div>
      Derzeit
      <span v-if="number_of_free_usb == total_usb">sind alle</span>
      <span v-else-if="number_of_free_usb > 1"
        >sind {{ number_of_free_usb }} von</span
      >
      <span v-else-if="number_of_free_usb == 1">ist einer von</span>
      <span v-else>ist keiner von</span> {{ total_usb }} USB-Steckern frei. Von
      den {{ total_qi }} Qi-Ladestationen
      <span v-if="number_of_free_qi == total_qi">sind alle</span>
      <span v-else-if="number_of_free_qi > 1"
        >sind {{ number_of_free_qi }}</span
      >
      <span v-else-if="number_of_free_qi == 1">ist eine</span>
      <span v-else>ist keine</span> frei.
    </div>
    <!--
    <ul>
      <li v-for="(type, index) in table.ports" :key="index">
        {{ type }}:
        <span v-if="latest.port_usage[index] > 0.1">Besetzt</span>
        <span v-else>Frei</span>
      </li>
    </ul>
    -->
    <div>
      Der Akku ist zu {{ latest.battery_charge }}% geladen und lädt gerade
      <span v-if="latest.energy_production < 5">nicht</span> auf.
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loaded: false,
      total_usb: 0,
      total_qi: 0,
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
            this.total_usb += 1;

            if (discharge < 0.1) {
              this.number_of_free_usb += 1;
            }
          } else {
            this.total_qi += 1;

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