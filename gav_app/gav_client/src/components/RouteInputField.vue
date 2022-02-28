<template>
  <div>
    <v-menu offset-y bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-bind="attrs"
          v-on="on"
          v-model="input"
          @keyup.enter="getStopList()"
          :label="title"
          required
        ></v-text-field>
      </template>
      <v-list v-if="list" max-height="350" style="overflow-y: auto">
        <v-list-item v-for="el of list" :key="el.name" @click="setStop(el)">
          <v-list-item-content>{{ el.name }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { bus } from '../main';
export default {
  data() {
    return {
      input: '',
      list: undefined,
    };
  },
  props: {
    title: String,
  },
  methods: {
    async getStopList() {
      const { data } = await bus.$data.instance.get(`/points/${this.input}`);
      if (data instanceof Array) this.list = data;
      else this.list = [data];
    },
    setStop(stop) {
      this.$emit('setStop', { ...stop, stopType: this.title });
      this.input = stop.name;
      this.list = undefined;
    },
  },
};
</script>

<style lang="scss" scoped></style>
