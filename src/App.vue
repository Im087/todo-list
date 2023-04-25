<template>
  <v-app>
    <v-main>
      <CreateItem></CreateItem>
      <ToDoItemVue></ToDoItemVue>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CreateItem from './components/CreateItem/CreateItem.vue';
import ToDoItemVue from './components/ToDoItem/ToDoItem.vue';

export default defineComponent({
  name: 'App',

  components: {
    CreateItem,
    ToDoItemVue,
  },

  data () {
    return {
      
    }
  },
});
</script>
