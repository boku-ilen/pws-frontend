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

      <icon
        v-if="mounted"
        :name="name"
        :ports="ports"
        :id="id"
        :lat="lat"
        :lon="lon"
      />

      <router-link :to="{ path: '/table/' + id }">
        <b-button href="#" variant="primary">See Details ...</b-button>
      </router-link>
    </b-card>
  </div>
</template>

<script>
import Icon from "./OverviewIcon.vue";

export default {
  components: {
    Icon,
  },

  props: {
    name: String,
    ports: Array,
    id: Number,
    lat: Number,
    lon: Number,
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