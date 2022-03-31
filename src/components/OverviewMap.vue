<template>
  <div class="container" style="height: 60vh; width: 100%">
    <l-map ref="map" :max-zoom="maxZoom" :bounds="getBounds">
      <l-tile-layer
        url="http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-feature-group v-for="(table, index) in tables" :key="index">
        <l-marker :lat-lng="[table.location_lon, table.location_lat]">
          <l-icon>
            <router-link to="/table">
              <map-icon
                :name="table.name"
                :latLon="[table.location_lat, table.location_lon]"
                :ports="table.ports"
                :id="table.id"
              />
            </router-link>
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
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import MapIcon from "./MapIcon.vue";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LFeatureGroup,
    LIcon,
    MapIcon,
  },

  props: {
    tables: Array,
  },

  data() {
    return {
      zoom: 11,
      maxZoom: 19,
    };
  },

  async mounted() {},

  computed: {
    getBounds() {
      let min = [
        Math.min(...this.tables.map((table) => table.location_lon)),
        Math.min(...this.tables.map((table) => table.location_lat)),
      ];
      let max = [
        Math.max(...this.tables.map((table) => table.location_lon)),
        Math.max(...this.tables.map((table) => table.location_lat)),
      ];

      // Make the bounds a bit bigger
      min.map((x) => (x -= x * 0.1));
      max.map((x) => (x += x * 0.1));

      return [min, max];
    },
  },

  methods: {},
};
</script>