<template>
  <v-container class="d-flex">
    <v-text-field
      placeholder="What are you gonna do?"
      v-model="toDoItem.toDoContent"
    >
    </v-text-field>
    <v-btn color="info" size="x-large" @click="addToDoItem">Create</v-btn>
  </v-container>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref, type Ref } from "vue";

import type { ToDoItem } from '../../interfaces';

export default defineComponent ({
  name: "CreateItem",
  setup() {
    const store = useStore();
    const toDoItem: Ref<ToDoItem> = ref({
      itemStatus: false,
      timeStamp: '',
      toDoContent: '',
    });

    const addToDoItem = () => {
      toDoItem.value.timeStamp = new Date().toISOString();
      let item = Object.assign({}, toDoItem.value)
      toDoItem.value.toDoContent = '';
      store.dispatch('addToDoItem', item);
    };

    return {
      toDoItem,
      addToDoItem
    };
  }
});
</script>

<style lang="scss" scoped>

</style>