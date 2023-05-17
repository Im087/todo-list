import { describe, test, expect, vi } from 'vitest';
import ItemFilter from '../../src/components/ItemFilter/ItemFilter.vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe('ItemFilter.vue', () => {
  const vuetify = createVuetify({components, directives});

  describe('When mounted', () => {
    const wrapper = mount(ItemFilter, {
      global: {
        plugins: [vuetify]
      },
      props: {
        itemFilter: 'all'
      }
    });

    test('get props', () => {
      expect(wrapper.props().itemFilter).toEqual('all');
    });

    wrapper.unmount();
  });

  describe('When clicking on an option', async () => {
    const wrapper = mount(ItemFilter, {
      global: {
        plugins: [vuetify]
      },
      props: {
        itemFilter: 'all'
      },
      attachTo: document.body
    });
    const vRadioGroup = wrapper.getComponent('[data-test-id="item-filter__radio-group"]');
    const spy = vi.spyOn(wrapper.vm, 'changeItemFilter');

    await vRadioGroup.findAll('input')[1].trigger('click');

    test('changeItemFilter function is called', () => {
      expect(spy).toBeCalled();
    });
    test('new value is set', () => {
      expect(wrapper.vm.isChecked).toEqual('done');
    });
    // test('event is emitted', () => {
    //   expect(wrapper.emitted()).toHaveProperty('itemFilter');
    // });

    wrapper.unmount();
  });

  describe('Snapshot', () => {
    const wrapper = mount(ItemFilter, {
      global: {
        plugins: [vuetify]
      },
      props: {
        itemFilter: 'all'
      },
      attachTo: document.body
    });

    test('is OK', () => {
      expect(wrapper.vm).toMatchSnapshot();
    });

    wrapper.unmount();
  });
});