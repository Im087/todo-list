<template>
  <!-- <v-app>
    <v-container>
      <h1>To Do List</h1>
    </v-container>
    <v-main>
      <CreateItem></CreateItem>
      <ItemFilter v-model:itemFilter="itemFilter"></ItemFilter>
      <ToDoItemVue
        v-for="toDoItem in filteredArray"
        :key="toDoItem.timeStamp"
        :toDoItem="toDoItem"
      >
      </ToDoItemVue>
    </v-main>
  </v-app> -->
  <v-container>
    <v-container>
      <h1>To Do List</h1>
    </v-container>
    <v-container>
      <CreateItem></CreateItem>
      <ItemFilter v-model:itemFilter="itemFilter"></ItemFilter>
      <ToDoItemVue
        v-for="toDoItem in filteredArray"
        :key="toDoItem.timeStamp"
        :toDoItem="toDoItem"
      >
      </ToDoItemVue>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type ComputedRef } from 'vue';

import CreateItem from './components/CreateItem/CreateItem.vue';
import ItemFilter from './components/ItemFilter/ItemFilter.vue';
import ToDoItemVue from './components/ToDoItem/ToDoItem.vue';

import type { ToDoItem } from './interfaces';
import store from './store';

export default defineComponent({
  name: 'App',
  components: {
    CreateItem,
    ItemFilter,
    ToDoItemVue,
  },
  setup() {
    const toDoArray: ComputedRef<ToDoItem[]> = computed(() => store.getters.getToDoArray);
    const itemFilter = ref('all');

    const filteredArray: ComputedRef<ToDoItem[]> = computed(() => {
      let isChecked = itemFilter.value;
      if(isChecked === 'done') {
        return toDoArray.value.filter(item => item.itemStatus === true);
      } else if(isChecked === 'undone') {
        return toDoArray.value.filter(item => item.itemStatus === false);
      } else {
        return toDoArray.value;
      }
    });

    return {
      toDoArray,
      itemFilter,
      filteredArray
    };
  }
});
</script>
