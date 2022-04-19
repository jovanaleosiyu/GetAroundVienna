<template>
  <Map :centerCurrPos="true" class="map-view" />
</template>

<script>
import Map from '../components/Map.vue';
export default {
  components: {
    Map,
  },
};
</script>

<style lang="scss" scoped>
.map-view {
  height: 100%;
  width: 100%;
}
</style>
