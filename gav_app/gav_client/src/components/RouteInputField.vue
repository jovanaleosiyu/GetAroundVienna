<template>
  <div>
    <v-autocomplete
      v-model="model"
      clearable
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      hide-no-data
      hide-selected
      item-text="name"
      item-value="ref"
      :label="title"
      return-object
      @change="setStop"
    ></v-autocomplete>
  </div>
</template>

<script>
import { bus } from '../main';
import { debounce } from 'throttle-debounce';

export default {
  data() {
    return {
      model: null,
      items: [],
      isLoading: false,
      search: null,
    };
  },
  props: {
    title: String,
  },
  methods: {
    async setStopByRef(ref, type) {
      if (!ref || !type) return;
      await bus.$data.instance.get(`/points/${type}/${ref}`).then((res) => {
        let point;
        if (res.data instanceof Array) point = res.data[0];
        point = res.data;
        this.items.push(point);
        this.model = point;
      });
    },
    setStop(stop) {
      if (!stop) return;
      this.$emit('setStop', { ...stop, stopType: this.title });
    },
  },
  created() {
    this.getStopList = debounce(500, async (searchname) => {
      bus.$data.instance
        .get(`/points/${searchname.replace('/', ',')}`)
        .then((res) => {
          if (this.items.length > 1) this.items = []; // ... bc if 1 then its this.model
          if (res.data instanceof Array)
            this.items = this.items.concat(res.data);
          else this.items.push(res.data);
        })
        .catch((e) => {
          if (e.response.status == 404) this.items = [];
          else console.log(e);
        })
        .finally(() => {
          console.log(this.items);
          console.log(this.model);
          this.isLoading = false;
        });
    });
  },
  watch: {
    search(val) {
      if (!val) return;
      this.isLoading = true;
      this.getStopList(val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
