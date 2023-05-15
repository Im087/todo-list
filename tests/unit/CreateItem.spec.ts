import { describe, test, expect, vi, beforeEach, afterEach, SpyInstance } from "vitest";
import CreateItem from '../../src/components/CreateItem/CreateItem.vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe('CreateItem.vue', () => {
  const vuetify = createVuetify({components, directives});
  // const $store = {
  //   state: {
  //     toDoArray: []
  //   },
  //   dispatch: vi.fn(),
  //   commit: vi.fn()
  // };

  describe('When the input updates', async () => {
    const wrapper = mount(CreateItem, {
      global: {
        plugins: [vuetify]
      }
    });
    const vTextField = wrapper.getComponent('[data-test-id="create-item__input"]');

    await vTextField.get('input').setValue('todo');

    test('two-way binding will work', () => {
      expect(wrapper.vm.toDoItem.toDoContent).toEqual('todo');
    });

    wrapper.unmount();
  });

  describe('When clicking on CREATE button', () => {
    let wrapper: VueWrapper<any>;
    let spy: SpyInstance<unknown[], unknown>;

    beforeEach(async () => {
      wrapper = mount(CreateItem, {
        global: {
          plugins: [vuetify],
          // mocks: {
          //   $store
          // }
        }
      });
      spy = vi.spyOn(wrapper.vm, 'addToDoItem');
      const vTextField = wrapper.getComponent('[data-test-id="create-item__input"]');
      const vBtn = wrapper.getComponent('[data-test-id="create-item__btn"]');

      await vTextField.get('input').setValue('todo');
      await vBtn.get('button').trigger('click');
    });

    afterEach(() => {
      wrapper.unmount();
    });

    test('addToDoItem function is called', () => {
      expect(spy).toBeCalled();
    });
    // test('vuex action is called', () => {
    //   expect($store.dispatch).toHaveBeenCalled();
    // });
    test('input will be empty', () => {
      expect(wrapper.get('input').element.value).toEqual('');
    });
    test('toDoItem.toDoContent will be empty', () => {
      expect(wrapper.vm.toDoItem.toDoContent).toEqual('');
    });
  });

  describe('snapshot', () => {
    const wrapper = mount(CreateItem, {
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