<template>
  <div>
    <b-card
      :title="name"
      :img-src="getImagePath"
      :img-alt="name"
      img-top
      style="max-width: 50rem"
      class="mb-2 mx-auto"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <table-short-description
        v-if="mounted"
        batteryCharge=23.8
        :ports="ports"
        :id="id"
        :leftAligned="false"
        weatherState="SUNNY"
      />

      <router-link :to="{ path: '/table/' + id }">
        <b-button href="#" variant="primary">See Details ...</b-button>
      </router-link>
    </b-card>
  </div>
</template>

<script>
import TableShortDescription from './TableShortDescription.vue';

export default {
  components: {
    TableShortDescription,
  },

  props: {
    batteryCharge: Number,
    id: Number,
    ports: Array,
  },

  data() {
    return {
      mounted: false,
    };
  },

  computed: {
    getImagePath() {
      return require(`../assets/location_${this.id}.jpg`);
    },
  },

  mounted() {
    this.mounted = true;
  },
};
</script>

<style>
</style>