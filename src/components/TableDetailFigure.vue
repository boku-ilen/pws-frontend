<template>
    <div class="container-fluid justify-content-center mt-5 svg-container">
        <svg class="detail-svg" width="700" height="700">
            <image x="0" y="50" width="86%" height="85%" href="../assets/tableDetail.svg"/>
            <!-- TOP ICONS -->
            <text y="40.5" transform="translate(171)" class="svgText">
                <tspan x="0" text-anchor="middle">STROM</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">PRODUKTION</tspan>
                <tspan v-if="isCharging" x="0" dy="1.2em" text-anchor="middle" >aktiv</tspan> 
                <tspan v-if="!isCharging" x="0" dy="1.2em" text-anchor="middle" >nicht aktiv</tspan> 
            </text>
            <text y="40.5" transform="translate(308)" class="svgText">
                <tspan x="0" text-anchor="middle">BATTERIE</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">{{ batteryCharge }}%</tspan>
                <tspan v-if="isCharging" x="0" dy="1.2em" text-anchor="middle" >lädt</tspan> 
                <tspan v-if="!isCharging" x="0" dy="1.2em" text-anchor="middle" >lädt nicht</tspan> 
            </text>
            <text y="40.5" transform="translate(570)" class="svgText">
                <tspan x="0" text-anchor="middle">WETTER</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em"> {{this.weatherStateNames[this.weatherState]}}</tspan>
                <tspan x="0" dy="1.2em" text-anchor="middle" >{{ degrees }}°C</tspan> 
            </text>
            <!-- USB Plugs -->
            <text y="275.5" transform="translate(170)" class="svgText">
                <tspan x="0" text-anchor="middle">USB</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">{{ getUSBPortState(0) }}</tspan>
            </text>
            <text y="255.5" transform="translate(245)" class="svgText">
                <tspan x="0" text-anchor="middle">USB</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">{{ getUSBPortState(1) }}</tspan>
            </text>
            <text y="235.5" transform="translate(320)" class="svgText">
                <tspan x="0" text-anchor="middle">USB</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">{{ getUSBPortState(2) }}</tspan>
            </text>
            <text y="215.5" transform="translate(395)" class="svgText">
                <tspan x="0" text-anchor="middle">USB</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">{{ getUSBPortState(3) }}</tspan>
            </text>
            <!-- QI Plugs -->
            <text y="230.5" transform="translate(495)" class="svgText">
                <tspan x="0" text-anchor="middle">Qi</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">{{ getQIPortState(0) }}</tspan>
            </text>
            <text y="260.5" transform="translate(570)" class="svgText">
                <tspan x="0" text-anchor="middle">Qi</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">{{ getQIPortState(1) }}</tspan>
            </text>

            <defs>
                <filter id="glow">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                    flood-color="#83ad59"/>
                </filter>
            </defs>
            <path v-if="isCharging" class="charging-line"
                    d="m95.25 385.856.102-155.16 56.556-15.06 119.764-3.268 7.46 5.6 4.839 31.406"
                    transform="translate(66 280) matrix(1.4 0 0 -1.33333 -126.5 514.474)"/>   
            
            <path v-if="isCharging" style="filter: url(#glow);" fill-rule="evenodd" 
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                transform="translate(165 170) rotate(135) scale(3 3)"/>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        weatherState: String,
        batteryCharge: Number,
        degrees: Number,
        usbPlugsFree: Array,
        qiPlugsFree: Array,
    },

    data() {
        return {
            weatherStateNames: {
                SUNNY: "sonnig",
                OVERCAST: "bewölkt",
                RAINY: "rainy",
            }
        }
    },

    methods: {
        getUSBPortState(index) {
            console.log(this.usbPlugsFree);
            console.log(index);
            if(this.usbPlugsFree[index] == 0) {
                return "besetzt"
            } else {
                return "frei"
            }
        },
        getQIPortState(index) {
            if(this.qiPlugsFree[index] == 0) {
                return "besetzt"
            } else {
                return "frei"
            }
        }
    },

    computed: {
        isCharging() {
            return true;
        },
    }
}
</script>

<style scoped>
.svgText {
    font-size: 20px;
}

.detail-svg {
    text-align: center;
}

.charging-line {
    fill: none;
    stroke: #83ad59;
    stroke-width: 1.7px;
    filter: url(#glow);
    stroke-dasharray: 10; 
    animation: move 3s linear infinite;
}

@keyframes move {
    to {
        stroke-dashoffset: -100;
    }
}

@media (min-width: 768px) {
  .svg-container {
    transform: scale(1);
    margin-left: auto !important;
    float: none;
    max-width: auto;
    max-height: auto;
  }
}

@media (max-width: 767px) {
  .svg-container {
    transform: scale(0.7);
    margin-left: 0 !important;
    max-width: 100px;
    max-height: 5px;
  }
}

@media (max-width: 550px) {
  .svg-container {
    transform: scale(0.5);
    margin-left: 0 !important;
    max-width: 100px;
    max-height: 5px;
  }
}
</style>