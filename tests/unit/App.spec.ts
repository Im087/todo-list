import { describe, test, expect, afterEach, vi, beforeEach } from 'vitest';
import App from '../../src/App.vue';
import CreateItem from '../../src/components/CreateItem/CreateItem.vue';
import ItemFilter from '../../src/components/ItemFilter/ItemFilter.vue';
import ToDoItem from '../../src/components/ToDoItem/ToDoItem.vue';
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';

describe('App.vue', () => {
  const vuetify = createVuetify({components, directives});
  const undoneItem = {
    itemStatus: false,
    isDisabled: true,
    timeStamp: new Date().toISOString(),
    toDoContent: 'todo1',
  };
  const doneItem = {
    itemStatus: true,
    isDisabled: true,
    timeStamp: new Date().toISOString(),
    toDoContent: 'todo2',
  };
  const $store = {
    state: {
      toDoArray: [undoneItem, doneItem]
    },
    getters: {
      // getToDoArray: (state) => vi.fn().mockReturnValue(state.toDoArray)
      // getToDoArray: (state) => state.toDoArray
      getToDoArray: [undoneItem, doneItem]
    }
  };
  const store = createStore({
    state: {
      toDoArray: [undoneItem, doneItem]
    },
    getters: {
      // getToDoArray: (state) => vi.fn().mockReturnValue(state.toDoArray)
      getToDoArray: (state) => state.toDoArray
    }
  });

  describe('When mounted', () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
      wrapper = mount(App, {
        global: {
          plugins: [vuetify, store],
          // mocks: {
          //   $store
          // }
        }
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    test('render child components', () => {
      expect(wrapper.findComponent(CreateItem).exists()).toBeTruthy();
      expect(wrapper.findComponent(ItemFilter).exists()).toBeTruthy();
    });
    // test('get vuex state', () => {
    //   expect(wrapper.vm.toDoArray).toEqual(store.getters.getToDoArray);
    // });
  });

  describe('When clicking on CREATE button', () => {
    let wrapper: VueWrapper<any>;

    beforeEach(async () => {
      wrapper = mount(App, {
        global: {
          plugins: [vuetify]
        }
      });

      await wrapper.findComponent(CreateItem).find('button').trigger('click');
    });

    afterEach(() => {
      wrapper.unmount();
    });


    test('a new item will be added to toDoArray/filteredArray', () => {
      expect(wrapper.vm.filteredArray).toHaveLength(1);
    });

    test('a ToDoItem component will be rendered', () => {
      expect(wrapper.findComponent(ToDoItem).exists()).toBeTruthy();
    });

  });

  describe('When changing filter', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuetify],
        // mocks: {
        //   $store
        // }
      },
      attachTo: document.body
    });

    await wrapper.findComponent(ItemFilter).findAll('input')[1].trigger('click');

    test('itemFilter will change', () => {
      expect(wrapper.vm.itemFilter).toEqual('done');
    });

    wrapper.unmount();
  });

  // describe('When itemFilter changes', async () => {
  //   const wrapper = mount(App, {
  //     global: {
  //       plugins: [vuetify],
  //       mocks: {
  //         $store
  //       }
  //     },
  //     attachTo: document.body
  //   });

  //   wrapper.vm.itemFilter = 'done';

  //   test('filteredArray will change', () => {
  //     expect(wrapper.vm.filteredArray).toEqual([doneItem]);
  //   });
  // });

  describe('snapshot', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuetify]
      }
    });

    test('is OK', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    wrapper.unmount();
  });
});