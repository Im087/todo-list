import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import CreateItem from '../../src/components/CreateItem/CreateItem.vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe('CreateItem.vue', () => {
  const vuetify = createVuetify({components, directives});
  const $store = {
    state: {
      toDoArray: [{toDoContent: '123'}]
    },
    dispatch: vi.fn(),
    commit: vi.fn()
  };

  describe('When the input updates', () => {
    const wrapper = mount(CreateItem, {
      global: {
        plugins: [vuetify]
      }
    });

    wrapper.getComponent('[data-test-id="create-item__input"]').get('input').setValue('todo');

    test('two-way binding will work', () => {
      expect(wrapper.vm.toDoItem.toDoContent).toMatch('todo')
    });

    wrapper.unmount();
  });

  describe('When clicking on CREATE button', () => {
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
      wrapper = mount(CreateItem, {
        global: {
          plugins: [vuetify],
          // mocks: {
          //   $store
          // }
        }
      });

      wrapper.getComponent('[data-test-id="create-item__input"]').get('input').setValue('todo');
    });

    afterEach(() => {
      wrapper.unmount()
    })

    test('addToDoItem function is called', async () => {
      const spy = vi.spyOn(wrapper.vm, 'addToDoItem');
      await wrapper.getComponent('[data-test-id="create-item__btn"]').get('button').trigger('click');
      expect(spy).toBeCalled();
    });
    // test('vuex action is called', () => {
    //   expect($store.dispatch).toHaveBeenCalled();
    // });
    test('input will be empty', async () => {
      await wrapper.getComponent('[data-test-id="create-item__btn"]').get('button').trigger('click');
      expect(wrapper.find('input').element.value).toEqual('');
    })
  });

  describe('snapshot', () => {
    test('is OK', () => {
      const wrapper = mount(CreateItem, {
        global: {
          plugins: [vuetify]
        }
      });
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });
});