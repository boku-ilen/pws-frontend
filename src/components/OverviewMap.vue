<template>
  <div class="container" style="height: 40vh; width: 40vw;">
    <l-map
      ref="map"
      :zoom=zoom
      :max-zoom=maxZoom
      :bounds=getBounds
      :center=centerVienna
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-feature-group v-for="(location, index) in locations" :key="index">
        <l-marker :lat-lng="location">
          <l-icon><map-icon/></l-icon>
        </l-marker>
      </l-feature-group>
    </l-map>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LMarker, LIcon, LFeatureGroup } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";
  import MapIcon from "./MapIcon.vue"

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LFeatureGroup,
      LIcon,
      MapIcon
    },
    data() {
      return {
        zoom: 12,
        maxZoom: 19,
        // FIXME: fetch real/mocked data
        locations: [[48.17849, 16.37208], [48.20949, 16.37408], [48.20859, 16.41238]],
        centerVienna: [48.2084, 16.37208]
      };
    },
    mounted() {
      // FIXME: this should actually work but does not (probably a version thing)
      //this.$refs.map.mapObject.fitBounds(this.getBounds)
    },
    computed: {
      getBounds() {
        let min = [ 
          Math.min(... this.locations.map(latlon => latlon[0])),
          Math.min(... this.locations.map(latlon => latlon[1])) 
        ]
        let max = [ 
          Math.max(... this.locations.map(latlon => latlon[0])),
          Math.max(... this.locations.map(latlon => latlon[1])) 
        ]
        return [ min, max ]
      },
    },
    methods: {
    },
  };
</script>