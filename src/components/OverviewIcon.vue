<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="70"
    viewBox="0 0 50 30"
    :transform="transform"
  >
    <svg>
      <g v-if="loaded">
        <path
          v-if="isMapIcon"
          transform="translate(10 15)"
          fill-rule="evenodd"
          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
        />
        <path
          v-for="pathColor in getBatteryIcon"
          :style="pathColor.color"
          :key="pathColor.path"
          :d="pathColor.path"
          transform="translate(10 0)"
        />
        <path
          v-if="isCharging"
          :d="chargingSvgPath"
          transform="translate(10 0)"
          style="fill: yellow"
        />
        <path
          v-for="path in getWeatherIcon"
          :key="path"
          :d="path"
          transform="translate(28 0)"
        />
        <path
          :style="getUsbColor"
          :d="usbSvgPath"
          transform="translate(-5 0)"
        />
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

      criticalColor: "red",
      optimalColor: "green",
      defaultColor: "black",
      chargingSvgPath:
        "M9.585 2.568a.5.5 0 0 1 .226.58L8.677 6.832h1.99a.5.5 0 0 1 .364.843l-5.334 5.667a.5.5 0 0 1-.842-.49L5.99 9.167H4a.5.5 0 0 1-.364-.843l5.333-5.667a.5.5 0 0 1 .616-.09z",
      usbSvgPath:
        "M6 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4H6v-4ZM7 1v1h1V1H7Zm2 0v1h1V1H9ZM5.5 5a.5.5 0 0 0-.5.5v4.894a2 2 0 0 0 .336 1.11l.83 1.245c.544.816.834 1.774.834 2.754 0 .275.222.497.497.497h2.006a.497.497 0 0 0 .497-.497c0-.98.29-1.938.834-2.754l.83-1.245a2 2 0 0 0 .336-1.11V5.5a.5.5 0 0 0-.5-.5h-6Z",
      weatherStates: {
        SUNNY: [
          "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z",
        ],
        OVERCAST: [
          "M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5z",
          "M14.544 9.772a3.506 3.506 0 0 0-2.225-1.676 5.502 5.502 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z",
        ],
        RAINY: [
          "M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z",
        ],
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

      this.loaded = true;
    });
  },

  computed: {
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
      return this.weatherStates[this.weatherState];
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