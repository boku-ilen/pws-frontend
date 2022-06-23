<template>
  <!-- FIXME: handle the district in a more generic way -->
  <b-card
    :title="`${this.id}. ${name}, Wien ${getDistrict}.`"
    :img-src="getImagePath"
    :img-alt="name"
    img-top
    class="mb-2 mt-4 h-100"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="getViewBox"
      :transform="getTransform"
    >
      <table-short-description
        v-if="mounted"
        batteryCharge=23.8
        :portUsage="portUsage"
        :id="id"
        :leftAligned="false"
        weatherState="SUNNY"
      />
    </svg>

    <router-link :to="{ path: '/table/' + id }">
      <b-button href="#" variant="primary">Weitere Infos ...</b-button>
    </router-link>
  </b-card>
</template>

<script>
import TableShortDescription from './TableShortDescription.vue';

export default {
  components: {
    TableShortDescription,
  },

  props: {
    name: String,
    batteryCharge: Number,
    id: Number,
    ports: Array,
  },

  data() {
    return {
      mounted: false,
      portUsage: [0, 0, 1, 1, 1],
      width: "250",
      height: "180",
      viewBoxWidth: 65,
      viewBoxHeight: 62,
    };
  },

  computed: {
    getImagePath() {
      return require(`../assets/location_${this.id}.jpg`);
    },

    getViewBox() {
      return `10 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`
    },

    getTransform() {
      return `translate(-50 0)`
    },

    getDistrict() {
      console.log(this.id);
      if(this.id == 1) return 16
      else return 8
    }
  },

  mounted() {
    this.mounted = true;
  },
};
</script>

<style>
.btn-primary {
  color: black !important;
  border-color: #83ad59 !important;
  background-color: rgba(0, 0, 0, 0) !important;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open>.dropdown-toggle.btn-primary {
  color: #fff !important;
  background-color: #83ad59 !important;
  border-color: #fd1c1c !important;
}

.card {
  border-color: #83ad59 !important;
  border-radius: 0% !important;
}

.card-img-top {
  border-radius: 0% !important;
}
</style>