<template>
  <div class="container" style="height: 60vh; width: 100%">
    <l-map ref="map" :max-zoom="maxZoom" :bounds="boundsVienna">
      <l-tile-layer
        url="http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-feature-group v-for="(table, index) in tables" :key="index">
        <l-marker :lat-lng="[table.location_lon, table.location_lat]">
          <l-icon>
            <router-link :to="{ path: '/table/' + table.id }">
              <icon
                :name="table.name"
                :ports="table.ports"
                :id="table.id"
                :isMapIcon="true"
                :leftAligned="table.id==1"
                :lat="table.location_lat"
                :lon="table.location_lon"
              />
            </router-link>
          </l-icon>
        </l-marker>
      </l-feature-group>
      <l-geo-json :options-style="styleFunction" :geojson="require(`../assets/districtsOutline.geojson`)"></l-geo-json>
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
  LGeoJson
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
    LGeoJson
  },

  props: {
    tables: Array,
  },

  data() {
    return {
      zoom: 11,
      maxZoom: 19,
      boundsVienna: [[48.1179032575946763, 16.1818304928183423], [48.3226665679489997, 16.5775142432875313]]
    };
  },

  async mounted() {},

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

      //return [min, max];
      return [[48.1179032575946763, 16.1818304928183423], [48.3226665679489997, 16.5775142432875313]];
    },

    styleFunction() {
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillOpacity: 1
        };
      };
    }
  },

  methods: {},
};
</script>