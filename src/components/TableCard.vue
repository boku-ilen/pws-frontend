<template>
  <div class="card mb-3">
    <img
      class="card-img-top"
      style="width: 60%"
      :src="getImagePath"
      :alt="name"
    />
    <div class="card-body; container-fluid">
      <h2 class="card-title">{{ name }}</h2>
      <p class="card-text">
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </p>
      <p class="card-text">
        <small class="text-muted">Last updated 3 mins ago</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    ports: Array,
    id: Number,
  },

  computed: {
    getImagePath() {
      return require(`../assets/location_${this.id}.jpg`);
    },
  },
};
</script>

<style>
</style>