<template>
  <div v-if="loaded">
    <h1>Arbeitsplatz {{ table.name }}</h1>
    <table-detail-description
      :qiPlugs="number_of_total_qi"
      :qiPlugsFree="number_of_free_qi"
      :usbPlugs="number_of_total_usb"
      :usbPlugsFree="number_of_free_usb"
    />
    <table-detail-figure
      v-if="loaded"
      :qiPlugsFree="getFreePlugsByType('QI')"
      :usbPlugsFree="getFreePlugsByType('USB')"
      :batteryCharge="this.latest['battery_charge']"
      :pvCharge="this.latest['energy_production']"
      :degrees="degrees"
      :weatherState="weatherState"
    />
  </div>
</template>

<script>
import TableDetailDescription from "./components/TableDetailDescription.vue";
import TableDetailFigure from "./components/TableDetailFigure.vue";
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
      plugs: [],
      plugsFree: [],
      weatherState: String,
      degrees: Number,
    };
  },

  async mounted() {
    await this.$store.dispatch("loadTables");
    await this.$store.dispatch("loadSnapshots");
    // FIXME: make this production ready
    await this.$store.dispatch("loadWeatherData");

    this.table = this.$store.getters.tablesById[this.table_type];
    this.latest = this.$store.getters.snapshots[this.table_type];
    this.plugsFree =
      this.$store.getters.snapshots[this.table_type]["port_usage"];
    this.plugs = this.$store.getters.tablesById[this.table_type]["ports"];
    this.weatherState =
      this.$store.getters.weatherData[this.table_type]["weatherState"];
    this.degrees = this.$store.getters.weatherData[this.table_type]["temp"];

    // Count number of (free) ports
    for (const [id, discharge] of this.latest["port_usage"].entries()) {
      if (this.table.ports[id] == "USB") {
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
  },

  methods: {
    getFreePlugsByType(type) {
      let startingIndex = this.plugs.indexOf(type);
      let endingIndex = this.plugs.lastIndexOf(type);
      return this.plugsFree.slice(startingIndex, endingIndex + 1);
    },
  },
};
</script>

<style>
</style>