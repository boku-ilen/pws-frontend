<template>
  <div class="container" style="height: 60vh; width: 60vw;">
    <l-map
      ref="map"
      :zoom=zoom
      :max-zoom=maxZoom
      :bounds=getBounds
    >
      <l-tile-layer
        url="http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"        
      ></l-tile-layer>
      <l-feature-group v-for="(table, index) in tables" :key="index">
        <l-marker :lat-lng="[table.location_lon, table.location_lat]">
          <l-icon>
            <map-icon
              :name="table.name"
              :latLon="[table.location_lat, table.location_lon]"
              :ports="table.ports"
              :id="table.id"
            />
          </l-icon>
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
        tables: [],
        serverUrl: "http://192.168.0.165:8000", 
      };
    },

    async mounted() {
      let tables_unvariables = await fetch(`${this.serverUrl}/tables/all`)
      tables_unvariables = await tables_unvariables.json()
      
      this.tables = tables_unvariables
    },

    computed: {
      getBounds() {
        let min = [ 
          Math.min(... this.tables.map(table => table.location_lon)),
          Math.min(... this.tables.map(table => table.location_lat)) 
        ]
        let max = [ 
          Math.max(... this.tables.map(table => table.location_lon)),
          Math.max(... this.tables.map(table => table.location_lat)) 
        ]
        return [ min, max ]
      },
    },

    methods: {
    },
  };
</script>