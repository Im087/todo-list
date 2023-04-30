<template>
  <v-container class="to-do-item d-flex flex-wrap bg-grey-lighten-3 rounded mb-2">
    <v-checkbox
      class="flex-grow-0 to-do-item__checkbox"
      :class="toDoItem.itemStatus ? 'to-do-item__checkbox--checked' : 'to-do-item__checkbox--unchecked'"
      :label="toDoItem.itemStatus ? 'Done' : 'Undone'"
      color="success"
      hide-details
      v-model="toDoItem.itemStatus"
    >
    </v-checkbox>
    <v-textarea
      class="flex-grow-1"
      rows="1"
      bg-color="transparent"
      :disabled="toDoItem.isDisabled"
      v-model="toDoItem.toDoContent"
      hide-details
      clearable
      auto-grow
      no-resize
    >
    </v-textarea>
    <div class="ml-4">
      <v-btn v-if="toDoItem.isDisabled" class="mt-2 mr-2" color="warning" size="large" @click="editToDoItem">Edit</v-btn>
      <v-btn v-if="!toDoItem.isDisabled" class="mt-2 mr-2" color="success" size="large" @click="confirmToDoItem">OK</v-btn>
      <v-btn class="mt-2" color="error" size="large" @click="deleteToDoItem(toDoItem.timeStamp)">Delete</v-btn>
    </div>
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
.to-do-item {

  &__checkbox {
    min-width: 100px;

    &--checked :deep(.v-label) {
      color: green;
    }

    &--unchecked :deep(.v-label) {
      color: red;
    }
  }
}
</style>