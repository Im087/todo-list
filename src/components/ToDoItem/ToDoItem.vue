<template>
  <v-container class="to-do-item d-flex flex-wrap bg-grey-lighten-3 rounded mb-2">
    <v-checkbox
      class="flex-grow-0 to-do-item__checkbox"
      :class="toDoItem.itemStatus ? 'to-do-item__checkbox--checked' : 'to-do-item__checkbox--unchecked'"
      :label="toDoItem.itemStatus ? 'Done' : 'Undone'"
      color="success"
      hide-details
      v-model="toDoItem.itemStatus"
      data-test-id="to-do-item__checkbox"
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
      no-resize
      data-test-id="to-do-item__textarea"
    >
    </v-textarea>
    <div class="ml-4">
      <v-btn
        v-if="toDoItem.isDisabled"
        class="mt-2 mr-2"
        color="warning"
        size="large"
        @click="editToDoItem()"
        data-test-id="to-do-item__edit-btn"
      >
        Edit
      </v-btn>
      <v-btn
        v-if="!toDoItem.isDisabled"
        class="mt-2 mr-2"
        color="success"
        size="large"
        @click="confirmToDoItem()"
        data-test-id="to-do-item__confirm-btn"
      >
        OK
      </v-btn>
      <v-btn
        class="mt-2"
        color="error"
        size="large"
        @click="deleteToDoItem(toDoItem.timeStamp)"
        data-test-id="to-do-item__delete-btn"
      >
        Delete
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs, type PropType } from "vue";
import type { ToDoItem } from "@/interfaces";
import store from "@/store";

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