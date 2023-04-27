<template>
  <v-container class="d-flex">
    <v-checkbox
      class="flex-grow-0"
      :label="itemStatus ? 'Done' : 'Undone'"
      :value="itemStatus ? 'Done' : 'Undone'"
      color="info"
    >
    </v-checkbox>
    <v-textarea
      class="flex-grow-1"
      rows="1"
      bg-color="transparent"
      :value="toDoContent"
      clearable
      auto-grow
      no-resize
    >
    </v-textarea>
    <v-btn color="warning" size="large">Edit</v-btn>
    <v-btn color="error" size="large" @click="deleteToDoItem(timeStamp)">Delete</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { useStore } from "@/store";

export default defineComponent ({
  name: "ToDoItem",
  props: {
    toDoItem: {
      type: Object,
      required: true,
      deep: true
    }
  },
  setup(props) {
    const store = useStore();
    const toDoItem = toRefs(props).toDoItem;
    const itemStatus = toDoItem.value.itemStatus;
    const timeStamp = toDoItem.value.timeStamp;
    const toDoContent = toDoItem.value.toDoContent;

    const deleteToDoItem = (timeStamp: string) => {
      store.dispatch('deleteToDoItem', timeStamp);
    }

    return {
      itemStatus,
      timeStamp,
      toDoContent,
      deleteToDoItem
    };
  }
});
</script>

<style lang="scss" scoped>

</style>