<template>
  <v-container class="d-flex">
    <v-checkbox class="flex-grow-0" label="Done" value="Done" color="info"></v-checkbox>
    <v-textarea class="flex-grow-1" rows="1" bg-color="transparent" placeholder="What are you gonna do?" clearable auto-grow no-resize></v-textarea>
    <v-btn color="warning" size="large">Edit</v-btn>
    <v-btn color="error" size="large">Delete</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
  name: "ToDoItem",
});
</script>

<style lang="scss" scoped>

</style>