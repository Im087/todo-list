import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import ToDoItem from '../../src/components/ToDoItem/ToDoItem.vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe('ToDoItem.vue', () => {
  const vuetify = createVuetify({components, directives});
  const $store = {
    state: {
      toDoArray: []
    },
    dispatch: vi.fn(),
    commit: vi.fn()
  };

  describe('When mounted', () => {
    const toDoItem = {
      itemStatus: false,
      isDisabled: true,
      timeStamp: new Date().toISOString(),
      toDoContent: 'todo',
    };
    const wrapper = mount(ToDoItem, {
      global: {
        plugins: [vuetify]
      },
      props: {
        toDoItem
      }
    });

    test('get props', () => {
      expect(wrapper.props().toDoItem).toEqual(toDoItem);
    })

    wrapper.unmount();
  });

  describe('When checkbox checked', async () => {
    const toDoItem = {
      itemStatus: false,
      isDisabled: true,
      timeStamp: new Date().toISOString(),
      toDoContent: 'todo',
    };
    const wrapper = mount(ToDoItem, {
      global: {
        plugins: [vuetify]
      },
      props: {
        toDoItem
      },
      attachTo: document.body
    });
    const vCheckbox = wrapper.getComponent('[data-test-id="to-do-item__checkbox"]');

    await vCheckbox.get('input').trigger('click');

    test('the checked attribute is true', () => {
      expect(vCheckbox.get('input').element.checked).toBeTruthy();
    });
    test('toDoItem.itemStatus is true', () => {
      expect(wrapper.vm.toDoItem.itemStatus).toBeTruthy();
    });
    test('element class is .to-do-item__checkbox--checked', () => {
      expect(vCheckbox.classes()).toContain('to-do-item__checkbox--checked');
    });
    test('label text will be Done', () => {
      expect(vCheckbox.text()).toEqual('Done');
    });

    wrapper.unmount();
  });

  describe('When checkbox unchecked', async () => {
    const toDoItem = {
      itemStatus: true,
      isDisabled: true,
      timeStamp: new Date().toISOString(),
      toDoContent: 'todo',
    };
    const wrapper = mount(ToDoItem, {
      global: {
        plugins: [vuetify]
      },
      props: {
        toDoItem
      },
      attachTo: document.body
    });
    const vCheckbox = wrapper.getComponent('[data-test-id="to-do-item__checkbox"]');

    await vCheckbox.get('input').trigger('click');

    test('the checked attribute is false', () => {
      expect(vCheckbox.get('input').element.checked).toBeFalsy();
    });
    test('toDoItem.itemStatus is false', () => {
      expect(wrapper.vm.toDoItem.itemStatus).toBeFalsy();
    });
    test('element class is .to-do-item__checkbox--checked', () => {
      expect(vCheckbox.classes()).toContain('to-do-item__checkbox--unchecked');
    });
    test('label text will be Done', () => {
      expect(vCheckbox.text()).toEqual('Undone');
    });

    wrapper.unmount();
  });

  describe('When clicking on EDIT button', async () => {
    const toDoItem = {
      itemStatus: false,
      isDisabled: true,
      timeStamp: new Date().toISOString(),
      toDoContent: 'todo',
    };
    const wrapper = mount(ToDoItem, {
      global: {
        plugins: [vuetify]
      },
      props: {
        toDoItem
      }
    });
    const vBtn = wrapper.getComponent('[data-test-id="to-do-item__edit-btn"]');
    const spy = vi.spyOn(wrapper.vm, 'editToDoItem');
    
    await vBtn.get('button').trigger('click');

    test('editToDoItem function is called', () => {
      expect(spy).toHaveBeenCalled();
    });
    test('textarea is activated', () => {
      expect(wrapper.findComponent('[data-test-id="to-do-item__textarea"]').get('textarea').element.disabled).toBeFalsy();
    });
    test('toToItem.isDisabled is false', () => {
      expect(wrapper.vm.toDoItem.isDisabled).toBeFalsy();
    });
    // test('EDIT button is destroyed', () => {
    //   expect(wrapper.findComponent('[data-test-id="to-do-item__edit-btn"]').exists()).toBeFalsy();
    // });
    // test('OK button is created', () => {
    //   expect(wrapper.findComponent('[data-test-id="to-do-item__confirm-btn"]').exists()).toBeTruthy();
    // });

    wrapper.unmount();
  });

  describe('When clicking on OK button', async () => {
    const toDoItem = {
      itemStatus: false,
      isDisabled: false,
      timeStamp: new Date().toISOString(),
      toDoContent: 'todo',
    };
    const wrapper = mount(ToDoItem, {
      global: {
        plugins: [vuetify]
      },
      props: {
        toDoItem
      }
    });
    const vBtn = wrapper.getComponent('[data-test-id="to-do-item__confirm-btn"]');
    const spy = vi.spyOn(wrapper.vm, 'confirmToDoItem');

    await vBtn.get('button').trigger('click');

    test('confirmToDoItem function is called', () => {
      expect(spy).toBeCalled();
    });
    test('textarea is disabled', () => {
      expect(wrapper.findComponent('[data-test-id="to-do-item__textarea"]').get('textarea').element.disabled).toBeTruthy();
    });
    test('toToItem.isDisabled is true', () => {
      expect(wrapper.vm.toDoItem.isDisabled).toBeTruthy();
    });
    // test('OK button is destroyed', () => {
    //   expect(wrapper.findComponent('[data-test-id="to-do-item__confirm-btn"]').exists()).toBeFalsy();
    // });
    // test('EDIT button is created', () => {
    //   expect(wrapper.findComponent('[data-test-id="to-do-item__edit-btn"]').exists()).toBeTruthy();
    // });

    wrapper.unmount();
  });

  describe('When clicking on DELETE button', async () => {
    const toDoItem = {
      itemStatus: false,
      isDisabled: true,
      timeStamp: new Date().toISOString(),
      toDoContent: 'todo',
    };
    const wrapper = mount(ToDoItem, {
      global: {
        plugins: [vuetify]
      },
      props: {
        toDoItem
      },
      mocks: {
        $store
      }
    });
    const vBtn = wrapper.getComponent('[data-test-id="to-do-item__delete-btn"]');
    const spy = vi.spyOn(wrapper.vm, 'deleteToDoItem');

    await vBtn.get('button').trigger('click');

    test('deleteToDoItem is called', () => {
      expect(spy).toBeCalled();
    });
    // test('vuex action is called', () => {
    //   expect($store.dispatch).toBeCalled();
    // })

    wrapper.unmount();
  });

  describe('When the textarea updates', async () => {
    const toDoItem = {
      itemStatus: false,
      isDisabled: false,
      timeStamp: new Date().toISOString(),
      toDoContent: 'todo',
    };
    const wrapper = mount(ToDoItem, {
      global: {
        plugins: [vuetify]
      },
      props: {
        toDoItem
      }
    });
    const vTextarea = wrapper.getComponent('[data-test-id="to-do-item__textarea"]');

    await vTextarea.get('textarea').setValue('new todo');

    test('two-way binding will work', () => {
      expect(wrapper.vm.toDoItem.toDoContent).toEqual('new todo');
    });

    wrapper.unmount();
  });

  describe('Snapshot', () => {
    const toDoItem = {
      itemStatus: false,
      isDisabled: true,
      timeStamp: new Date().toISOString(),
      toDoContent: 'todo',
    };
    const wrapper = mount(ToDoItem, {
      global: {
        plugins: [vuetify]
      },
      props: {
        toDoItem
      }
    });

    test('is OK', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    wrapper.unmount();
  });
});