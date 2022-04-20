<template>
  <v-container>
    <v-sheet class="px-6 py-1 ma-3 rounded-lg">
      <v-autocomplete
        v-model="model"
        :items="stops"
        item-text="name"
        item-value="DIVA"
        hide-no-data
        hide-selected
        @change="searchStop"
        label="Haltestelle"
      ></v-autocomplete>
      <MonitorList :monitors="monitors" />
    </v-sheet>
  </v-container>
</template>

<script>
import { bus } from '../main';
import MonitorList from '../components/MonitorList.vue';
export default {
  components: {
    MonitorList,
  },
  data() {
    return {
      // Searchfield
      stops: [],
      model: null,
      search: null,
      monitors: [],
    };
  },
  methods: {
    async searchStop() {
      const { data } = await bus.$data.instance.get(
        `/stops/monitor/${this.model}`
      );
      console.log(data);
      this.monitors = data;
    },
  },
  async created() {
    const { data } = await bus.$data.instance.get('/stops');
    this.stops = data;
  },
};
</script>

<style lang="scss" scoped></style>
