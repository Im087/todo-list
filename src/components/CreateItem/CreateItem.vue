<template>
  <v-container class="create-item d-flex flex-wrap justify-center">
    <v-text-field
      class="create-item__input mb-2"
      placeholder="What are you gonna do?"
      hide-details
      v-model="toDoItem.toDoContent"
    >
    </v-text-field>
    <v-btn class="ml-6" color="info" size="x-large" @click="addToDoItem">Create</v-btn>
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
      isDisabled: true,
      timeStamp: '',
      toDoContent: '',
    });

    const addToDoItem = () => {
      toDoItem.value.timeStamp = new Date().toISOString();
      let item = Object.assign({}, toDoItem.value);
      store.dispatch('addToDoItem', item);
      toDoItem.value.toDoContent = '';
    };

    return {
      toDoItem,
      addToDoItem
    };
  }
});
</script>

<style lang="scss" scoped>
.create-item {

  &__input {
    min-width: 200px;
  }
}
</style>