<template>
  <v-container class="d-flex">
    <v-text-field placeholder="What are you gonna do?"></v-text-field>
    <v-btn color="info" size="x-large">Create</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
  name: "CreateItem",
});
</script>

<style lang="scss" scoped>

</style>