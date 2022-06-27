<template>
  <div>
    <div class="container">
        <h2> Die Ladestation verfügt über: </h2>
    </div>
    <div class="container div-centered">
        <div class="row div-centered">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
                    <image x="0" y="0" width="40" height="40" href="../assets/usbPort.svg"/>
                </svg>
                {{ usbPlugs }} USB-Plugs / {{ usbPlugs - usbPlugsFree }} besetzt
            </span>
        </div>
        <div class="row div-centered">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
                    <image x="0" y="0" width="40" height="40" href="../assets/qiPoint.svg"/>
                </svg>
                {{ qiPlugs }} Qi-Ladepunkte / {{ qiPlugsFree }} besetzt
            </span>
        </div>
        <div class="row div-centered">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
                    <image x="0" y="0" width="40" height="40" href="../assets/wifi.svg"/>
                </svg>
                öffentliches Public Wien WLAN
            </span>
        </div>
        <div class="row div-centered">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
                    <image x="0" y="0" width="40" height="40" href="../assets/lights.svg"/>
                </svg>
                LED Licht
            </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        usbPlugs: Number,
        usbPlugsFree: Number,
        qiPlugs: Number,
        qiPlugsFree: Number,
    }
}
</script>

<style>
.div-centered {
  text-align: left; 
  margin: auto;
  padding: 1%;
  width: 500px !important;
}
</style>