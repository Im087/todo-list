<template>
  <v-app>
    <v-container>
      <h1>To Do List</h1>
    </v-container>
    <v-main>
      <CreateItem></CreateItem>
      <ToDoItemVue
        v-for="toDoItem in toDoArray"
        :key="toDoItem.timeStamp"
        :toDoItem="toDoItem"
      >
      </ToDoItemVue>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type ComputedRef } from 'vue';

import CreateItem from './components/CreateItem/CreateItem.vue';
import ToDoItemVue from './components/ToDoItem/ToDoItem.vue';

import type { ToDoItem } from './interfaces';
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  components: {
    CreateItem,
    ToDoItemVue,
  },
  setup() {
    const store = useStore();
    const toDoArray: ComputedRef<ToDoItem[]> = computed(() => store.getters.getToDoArray);

    return {
      toDoArray,
    };
  }
});
</script>
