<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="getViewBox"
    :transform="getTransform"
  >
    <router-link :to="{ path: '/table/' + this.id }">
      <svg v-if="isMapIcon" :transform="getMarkerTransform">
          <image href="../assets/marker.svg" />
      </svg>
    </router-link>

    <g v-if="loaded">
      <text v-if="leftAligned" class="svgMarkerId" x="50" y="60">{{ this.id }}</text>
      <text v-if="!leftAligned" class="svgMarkerId" x="10" y="60">{{ this.id }}</text>
      <table-short-description 
        :pvCharge="pvCharge"
        :batteryCharge="batteryCharge"
        :portUsage="portUsage"
        :weatherState="weatherState"
        :leftAligned="leftAligned" 
        :id="id"/>
    </g>
  </svg>
</template>

<script>
import TableShortDescription from "./TableShortDescription.vue"

export default {
  components: {
    TableShortDescription
  },

  props: {
    leftAligned: Boolean,
    isMapIcon: Boolean,
    name: String,
    ports: Array,
    id: Number,
    lat: Number,
    lon: Number,
  },

  data() {
    return {
      loaded: false,

      batteryCharge: Number,
      pvCharge: Number,
      portUsage: Array,
      weatherState: String,
      
      viewBoxWidth: 65,
      viewBoxHeight: 72,

      width: "230",
      height: "250",
    };
  },

  methods: {
    resizeIcons() {
      if (window.innerWidth > "1000") {
        this.width = "230";
        this.height = "250";
      } else {
        this.width = "130";
        this.height = "150";
      }
    }
  },

  async mounted() {
    let table_snapshot = this.$store.getters.snapshots[this.id];
    this.portUsage = table_snapshot.port_usage;      
    this.batteryCharge = table_snapshot.battery_charge;
    this.pvCharge = table_snapshot.energy_production;
    this.weatherState = this.$store.getters.weatherData[this.id];

    this.resizeIcons()

    this.loaded = true;
  },

  computed: {
    getTransform() {
      if(!this.leftAligned) return `translate(0 -${ this.height })`
      else return `translate(-${ this.width } -${ this.height })`
    },

    getMarkerTransform() {
      if(!this.leftAligned) return "translate(-1 0) scale(1 1)"
      else return `translate(${ this.viewBoxWidth + 1} 0) scale(-1 1)`
    },

    getViewBox() {
      return `0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`
    }
  },

  created() {
    window.addEventListener("resize", this.resizeIcons);
  },

  unmounted() {
    window.removeEventListener("resize", this.resizeIcons);
  },

  
};
</script>

<style>
</style>