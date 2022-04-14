<template>
  <div>
    <!-- <v-menu offset-y bottom>
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
      <v-expand-transition>
        <v-list
          v-if="list.length > 0"
          max-height="350"
          style="overflow-y: auto"
        >
          <v-list-item v-for="el of list" :key="el.name" @click="setStop(el)">
            <v-list-item-content>{{ el.name }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
    </v-menu> -->
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
    <v-btn color="success" @click="test">text</v-btn>
    <!-- <v-expand-transition>
      <v-list v-if="model" class="red lighten-3">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition> -->
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
    test() {
      // this.items.push({
      //   name: 'Wien, Hietzing',
      //   type: 'stop',
      //   ref: '60200520',
      //   stopType: 'Start',
      // });
      // this.model = '60200520';
      // console.log(this.model);
      this.setStopByRef('60200520', 'stop');
    },
    async setStopByRef(ref, type) {
      if (!ref || !type) return;
      await bus.$data.instance
        .get(`/points/${type}/${ref}`)
        .then((res) => {
          let point;
          if (res.data instanceof Array) point = res.data[0];
          point = res.data;
          console.log(point);
          this.items.push(point);
          console.log(this.items);
          this.model = point.name;
        })
        .catch((e) => {
          if (e.response.status == 404) this.items = [];
          else console.log(e);
        });
    },
    async getStopList() {},
    setStop(stop) {
      if (!stop) return;
      this.$emit('setStop', { ...stop, stopType: this.title });
      this.list = [];
    },
  },
  created() {
    this.getStopList = debounce(500, async (searchname) => {
      bus.$data.instance
        .get(`/points/${searchname}`)
        .then((res) => {
          if (res.data instanceof Array) this.items = res.data;
          else this.items = [res.data];
        })
        .catch((e) => {
          if (e.response.status == 404) this.items = [];
          else console.log(e);
        })
        .finally(() => {
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
