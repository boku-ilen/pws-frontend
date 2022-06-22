<template>
    <div class="container-fluid justify-content-center mt-5 svg-container">
        <svg class="detail-svg" width="700" height="700">
            <image x="0" y="50" width="86%" height="85%" href="../assets/tableDetail.svg"/>
            <!-- TOP ICONS -->
            <text y="40.5" transform="translate(171)" class="svgText">
                <tspan x="0" text-anchor="middle">STROM</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">PRODUKTION</tspan>
                <tspan x="0" dy="1.2em" text-anchor="middle" >aktiv</tspan> 
            </text>
            <text y="40.5" transform="translate(308)" class="svgText">
                <tspan x="0" text-anchor="middle">BATTERIE</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">73%</tspan>
                <tspan x="0" dy="1.2em" text-anchor="middle" >lädt</tspan> 
            </text>
            <text y="40.5" transform="translate(570)" class="svgText">
                <tspan x="0" text-anchor="middle">WETTER</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">bewölkt</tspan>
                <tspan x="0" dy="1.2em" text-anchor="middle" >24°C</tspan> 
            </text>
            <!-- USB Plugs -->
            <text y="275.5" transform="translate(170)" class="svgText">
                <tspan x="0" text-anchor="middle">USB</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">frei</tspan>
            </text>
            <text y="255.5" transform="translate(245)" class="svgText">
                <tspan x="0" text-anchor="middle">USB</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">frei</tspan>
            </text>
            <text y="235.5" transform="translate(320)" class="svgText">
                <tspan x="0" text-anchor="middle">USB</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">besetzt</tspan>
            </text>
            <text y="215.5" transform="translate(395)" class="svgText">
                <tspan x="0" text-anchor="middle">USB</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">besetzt</tspan>
            </text>
            <!-- QI Plugs -->
            <text y="230.5" transform="translate(495)" class="svgText">
                <tspan x="0" text-anchor="middle">Qi</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">besetzt</tspan>
            </text>
            <text y="260.5" transform="translate(570)" class="svgText">
                <tspan x="0" text-anchor="middle">Qi</tspan>
                <tspan x="0" text-anchor="middle" dy="1.2em">frei</tspan>
            </text>

            <path class="charging-line"
             d="m95.25 385.856.102-155.16 56.556-15.06 119.764-3.268 7.46 5.6 4.839 31.406"
              transform="translate(66 280) matrix(1.4 0 0 -1.33333 -126.5 514.474)"/>            
        </svg>
    </div>
</template>

<script>
export default {

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
    stroke: #3bc8ff;
    stroke-width: 1.7px;

    stroke-dasharray: 10; 
    animation: move 3s linear infinite;
}

@keyframes move {
    to {
        stroke-dashoffset: -100;
    }
}

.svg-container {
    
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