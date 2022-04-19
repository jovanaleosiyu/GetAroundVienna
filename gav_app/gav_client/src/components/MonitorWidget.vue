<template>
  <div class="monitor-wrapper">
    <h4 class="font-weight-medium">
      <v-icon>mdi-crosshairs-gps</v-icon> {{ name }}
    </h4>
    <MonitorList :monitors="monitors" />
  </div>
</template>

<script>
import { bus } from '../main';
import MonitorList from '../components/MonitorList.vue';
export default {
  name: 'MonitorWidget',
  components: {
    MonitorList,
  },
  data() {
    return {
      monitors: [],
      diva: undefined,
      name: '',
    };
  },
  methods: {
    async getMonitors() {
      const { data } = await bus.$data.instance.get(
        `/stops/monitor/${this.diva}`
      );
      console.log('call');
      console.log(data);
      if (!this.name) this.name = data[0].stopName;
      this.monitors = data;
    },
  },
  created() {
    // Geoloction for this
    this.diva = 60200981; // Ottakring but should be curr location
    this.getMonitors();
    setInterval(this.getMonitors, 60000); // Call every minute
  },
};
</script>
<style>
.monitor-wrapper {
  max-height: 30vh;
  overflow: auto;
}
</style>
