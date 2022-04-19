<template>
  <div class="monitor-wrapper">
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
    };
  },
  methods: {
    async getMonitors() {
      const { data } = await bus.$data.instance.get(
        `/stops/monitor/${this.diva}`
      );
      console.log('call');
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
