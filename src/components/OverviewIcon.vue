<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="getViewBox"
    :transform="getTransform"
  >
    <rect x=-500 y=-500 width=700 height=700 />
    <router-link :to="{ path: '/table/' + this.id }">
      <svg v-if="isMapIcon" :transform="getMarkerTransform">
          <image href="../assets/marker.svg" />
      </svg>
    </router-link>

    <g v-if="loaded">
      <text v-if="leftAligned" class="svgMarkerId" x="50" y="60">{{ this.id }}</text>
      <text v-if="!leftAligned" class="svgMarkerId" x="10" y="60">{{ this.id }}</text>
      <table-short-description 
        :batteryCharge="batteryCharge"
        :portUsage="portUsage"
        :weatherState="weatherState"
        :emptySlots="getEmptySlots"
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
    let table_variable = await fetch(`/tables/latest/${this.id}`);
    table_variable.json().then(async (table_variable) => {
      this.portUsage = table_variable.port_usage;      this.batteryCharge = table_variable.battery_charge;
      this.pvCharge = table_variable.energy_production;

      // eslint-disable-next-line
      if (false) {
        // Weather
        let apiKey = "db1a2f091413e833154a6de21adb3076";
        let openweathermap_onecall = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lon}&lon=${this.lat}&exclude=hourly,daily&appid=${apiKey}`
        );
        openweathermap_onecall = await openweathermap_onecall.json();

        let weatherID = openweathermap_onecall["current"]["weather"][0]["id"];
        let roughWeatherState = weatherID.toString()[0];

        // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
        if (roughWeatherState < 7) {
          this.weatherState = "RAINY";
        } else if (roughWeatherState == 7) {
          this.weatherState = "OVERCAST";
        } else {
          if (weatherID > 800) {
            this.weatherState = "OVERCAST";
          } else {
            this.weatherState = "SUNNY";
          }
        }
      } else {
        this.weatherState = "SUNNY";
      }
      
      this.resizeIcons()

      this.loaded = true;
    });
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