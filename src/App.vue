<template>
  <v-app>
    <v-main>
      <ToDoItemVue></ToDoItemVue>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ToDoItemVue from './components/ToDoItem/ToDoItem.vue';

export default defineComponent({
  name: 'App',

  components: {
    ToDoItemVue,
  },

  data () {
    return {
      
    }
  },
});
</script>
