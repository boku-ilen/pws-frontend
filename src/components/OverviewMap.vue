<template>
  <div class="container-fluid mb-2 w-100" style="min-height: 100vh; height: 99%; width: 100%">
    <l-map ref="map" :max-zoom="maxZoom" :options="{ zoomSnap: 0.1 }" :bounds="bounds">
      <l-geo-json class="district-border" :geojson="require(`../assets/districtsOutline.geojson`)"></l-geo-json>
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      ></l-tile-layer>
      <l-feature-group v-for="(table, index) in tables" :key="index">
        <l-marker :lat-lng="[table.location_lon, table.location_lat]" @ready="onReady">
          <l-icon>
            <icon
              :name="table.name"
              :ports="table.ports"
              :id="table.id"
              :isMapIcon="true"
              :leftAligned="table.id==1"
              :lat="table.location_lat"
              :lon="table.location_lon"
            />
          </l-icon>
        </l-marker>
      </l-feature-group>
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LFeatureGroup,
  LGeoJson,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "./OverviewIcon.vue";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LFeatureGroup,
    LIcon,
    Icon,
    LGeoJson,
  },

  props: {
    tables: Array,
  },

  data() {
    return {
      zoom: 11,
      maxZoom: 17,
      url: `https://stamen-tiles.a.ssl.fastly.net/terrain-lines/{z}/{x}/{y}.png`,
      attribution: `Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.`,
      bounds: [],
      center: [47.413220, -1.219482]
    };
  },

  async mounted() {
   
  },

  methods: {
    onReady() {
      this.bounds = [[48.13, 16.1818304928183423], [48.34, 16.5775142432875313]]
    }
  },

  computed: {
    getBoundsMarker() {
      let min = [
        Math.min(...this.tables.map((table) => table.location_lon)),
        Math.min(...this.tables.map((table) => table.location_lat)),
      ];
      let max = [
        Math.max(...this.tables.map((table) => table.location_lon)),
        Math.max(...this.tables.map((table) => table.location_lat)),
      ];

      // Make the bounds a bit bigger
      min.map((x) => (x -= x * 0.3));
      max.map((x) => (x *= 1.3));

      return [min, max];
    }
  }
};
</script>

<style>
path.leaflet-interactive {
  stroke: #000000 !important;
  stroke-width: 2px;
}

.map-card {
  position: absolute !important;
  top: 20%;
  z-index: 9999;
  left: 30%;
}
</style>