<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="230"
    height="250"
    viewBox="0 0 65 72"
    :transform="transform"
  >
    <svg v-if="isMapIcon">
        <image href="../assets/marker.svg" />
    </svg>
    <svg>
      <g v-if="loaded">
        <image x="18" y="10" width="10" height="10" href="../assets/batteryState.svg"/>
        <text x="30" y="14.5" font-size="4">{{ this.getEmptySlots }}%</text>
        <text v-if="is_charging" x="30" y="18.5" font-size="4">lädt</text>
        <text v-if="!is_charging" x="30" y="18.5" font-size="4">lädt nicht</text>

        <image x="18" y="23" width="10" height="10" href="../assets/sun.svg"/>
        <text x="30" y="29.5" font-size="4">{{this.weatherState}}</text>

        <image x="18" y="35.5" width="10" height="10" href="../assets/usbPort.svg"/>
        <text x="30" y="42" font-size="4">{{ this.number }}x frei</text>
        
      </g>
    </svg>
  </svg>
</template>

<script>
export default {
  props: {
    transform: String,
    isMapIcon: Boolean,
    name: String,
    ports: Array,
    id: Number,
  },

  data() {
    return {
      loaded: false,

      batteryCharge: Number,
      pvCharge: Number,
      portUsage: Array,
      weatherState: String,
      
      x: "30",
      y: "-93",
      width: "100",
      height: "300",

      number: 3,

      criticalColor: "red",
      optimalColor: "green",
      defaultColor: "black",
      chargingSvgPath:
        "M9.585 2.568a.5.5 0 0 1 .226.58L8.677 6.832h1.99a.5.5 0 0 1 .364.843l-5.334 5.667a.5.5 0 0 1-.842-.49L5.99 9.167H4a.5.5 0 0 1-.364-.843l5.333-5.667a.5.5 0 0 1 .616-.09z",
      usbSvgPath:
        "M6 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4H6v-4ZM7 1v1h1V1H7Zm2 0v1h1V1H9ZM5.5 5a.5.5 0 0 0-.5.5v4.894a2 2 0 0 0 .336 1.11l.83 1.245c.544.816.834 1.774.834 2.754 0 .275.222.497.497.497h2.006a.497.497 0 0 0 .497-.497c0-.98.29-1.938.834-2.754l.83-1.245a2 2 0 0 0 .336-1.11V5.5a.5.5 0 0 0-.5-.5h-6Z",
      weatherStates: {
        sonnig: "sun",
        bewölkt: "overcast",
        regnerisch: "sun",
      },
    };
  },

  async mounted() {
    let table_variable = await fetch(`/tables/latest/${this.id}`);
    table_variable.json().then((table_variable) => {

      this.portUsage = table_variable.port_usage;
      this.batteryCharge = table_variable.battery_charge;
      this.pvCharge = table_variable.energy_production;

      //FIXME: get weather state properly
      let temp = Object.keys(this.weatherStates);
      this.weatherState = temp[Math.floor(Math.random() * temp.length)];
      console.log(this.weatherState)
      console.log(this.weatherStates[this.weatherState])
      this.loaded = true;
    });
  },

  computed: {
    getViewBox: function() {
        return `${this.x} ${this.y} ${this.width} ${this.height}`
    },
    
    // Depending on the current state of the battery
    // we get different icons (full, middle, empty)
    getBatteryIcon() {
      let pathsAndColors = [];

      if (this.batteryCharge <= 15) {
        pathsAndColors.push({
          color: `fill:${this.criticalColor}`,
          path: "M0 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm14 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z",
        });
      } else if (this.batteryCharge > 85) {
        pathsAndColors.push({
          color: `fill:${this.optimalColor}`,
          path: "M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z",
        });
        pathsAndColors.push({
          color: `fill:${this.optimalColor}`,
          path: "M2 6h10v4H2V6z",
        });
      } else {
        pathsAndColors.push({
          color: `fill:${this.defaultColor}`,
          path: "M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z",
        });
        pathsAndColors.push({
          color: `fill:${this.defaultColor}`,
          path: "M2 6h5v4H2V6z",
        });
      }

      return pathsAndColors;
    },

    isCharging() {
      // FIXME: change this according to a realistic number
      return this.pvCharge > 5;
    },

    getWeatherIcon() {
      let weatherIconPath = this.weatherStates[this.weatherState] + this.weatherStates.SUFFIX;
      console.log(weatherIconPath)
      return weatherIconPath;
    },

    getEmptySlots() {
      if (this.portUsage === undefined) return 0;

      return this.portUsage.reduce((x, y) => x + y);
    },

    getUsbColor() {
      if (this.portUsage === undefined) return NaN;
      return this.getEmptySlots == this.portUsage.length
        ? `fill:${this.criticalColor}`
        : `fill:${this.criticalColor}`;
    },
  },
};
</script>

<style>
</style>