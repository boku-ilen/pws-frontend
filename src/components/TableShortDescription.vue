<template>
    <svg>
        <g>
            <image x="19" y="10" width="10" height="10" href="../assets/batteryState.svg"/>
            <text x="31" y="14.5" class="svgText">{{ this.batteryCharge }}%</text>
            <text v-if="this.isCharging" x="31" y="18.5" class="svgText" >lädt</text>
            <text v-if="!this.isCharging" x="31" y="18.5" class="svgText">lädt nicht</text>

            <image x="19" y="23" width="10" height="10" :href="require(`../assets/${ this.getWeatherIcon }`)"/>
            <text x="31" y="29.5" class="svgText">{{this.weatherStateNames[this.weatherState]}}</text>

            <image x="19" y="35.5" width="10" height="10" href="../assets/usbPort.svg"/>
            <text x="31" y="42" class="svgText">{{ this.getEmptySlots }}x frei</text>
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        name: String,
        batteryCharge: Number,
        pvCharge: Number,
        portUsage: Array,
        id: Number,
        leftAligned: Boolean,
        weatherState: String
    },

    data() {
        return {
            weatherStatePaths: {
                SUNNY: "sun.svg",
                OVERCAST: "overcast.svg",
                RAINY: "sun.svg",
            },
            weatherStateNames: {
                SUNNY: "sonnig",
                OVERCAST: "bewölkt",
                RAINY: "rainy",
            }
        }
    },

    computed: {
        isCharging() {
            // FIXME: change this according to a realistic number
            return this.pvCharge > 5;
        },

        getWeatherIcon() {
            let weatherIconPath = this.weatherStatePaths[this.weatherState];
            return weatherIconPath;
        },

        getEmptySlots() {
            if (this.portUsage === undefined) return 0;
            return this.portUsage.length - this.portUsage.reduce((x, y) => x + y);
        },
    }
}
</script>

<style>
.svgText {
  fill: red;
  font-size: 4px;
  font-family: "DMSans";
}

.svgMarkerId {
  fill: white;
  font-family: "DMSans";
}
</style>