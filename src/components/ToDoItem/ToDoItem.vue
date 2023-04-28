<template>
  <v-container class="d-flex">
    <v-checkbox
      class="flex-grow-0"
      :label="toDoItem.itemStatus ? 'Done' : 'Undone'"
      v-model="toDoItem.itemStatus"
      color="info"
    >
    </v-checkbox>
    <v-textarea
      class="flex-grow-1"
      rows="1"
      bg-color="transparent"
      v-model="toDoItem.toDoContent"
      :disabled="toDoItem.isDisabled"
      clearable
      auto-grow
      no-resize
    >
    </v-textarea>
    <v-btn v-if="toDoItem.isDisabled" color="warning" size="large" @click="editToDoItem">Edit</v-btn>
    <v-btn v-if="!toDoItem.isDisabled" color="success" size="large" @click="confirmToDoItem">OK</v-btn>
    <v-btn color="error" size="large" @click="deleteToDoItem(toDoItem.timeStamp)">Delete</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs, type PropType } from "vue";
import { useStore } from "@/store";
import type { ToDoItem } from "@/interfaces";

export default defineComponent ({
  name: "ToDoItem",
  props: {
    toDoItem: {
      type: Object as PropType<ToDoItem>,
      required: true,
      deep: true
    }
  },
  setup(props) {
    const store = useStore();
    const toDoItem = toRefs(props).toDoItem;

    const editToDoItem = () => {
      toDoItem.value.isDisabled = false;
    };
    const confirmToDoItem = () => {
      toDoItem.value.isDisabled = true;
    };
    const deleteToDoItem = (timeStamp: string) => {
      store.dispatch('deleteToDoItem', timeStamp);
    };

    return {
      toDoItem,
      editToDoItem,
      confirmToDoItem,
      deleteToDoItem
    };
  }
});
</script>

<style lang="scss" scoped>

</style>