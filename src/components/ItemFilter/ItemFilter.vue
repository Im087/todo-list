<template>
  <v-container>
    <v-radio-group
      v-model="isChecked"
      hide-details inline
      @change="changeItemFilter()"
      data-test-id="item-filter__radio-group"
    >
      <v-radio
        label="All"
        color="info"
        value="all"
      >
      </v-radio>
      <v-radio
        label="Done"
        color="info"
        value="done"
      >
      </v-radio>
      <v-radio
        label="Undone"
        color="info"
        value="undone"
      >
      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";

export default defineComponent ({
  name: 'ItemFilter',
  props: {
    itemFilter: {
      type: String,
      required: true
    }
  },
  setup(props, {emit}) {
    const itemFilter = toRefs(props).itemFilter;
    const isChecked = ref(itemFilter.value);
    
    const changeItemFilter = () => {
      emit('update:itemFilter', isChecked.value);
    };

    return {
      isChecked,
      changeItemFilter
    };
  }
});
</script>

<style>

</style>