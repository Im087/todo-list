import { createStore, useStore as baseUseStore, Store } from 'vuex';
import type { InjectionKey } from 'vue';
import type { State, ToDoItem } from '@/interfaces';

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    toDoArray: []
  },
  getters: {
    getToDoArray(state: State) {
      return state.toDoArray;
    }
  },
  actions: {
    addToDoItem({ commit }, item: ToDoItem) {
      commit('ADD_TO_DO_ITEM', item);
    }
  },
  mutations: {
    ADD_TO_DO_ITEM(state: State, item: ToDoItem) {
      state.toDoArray.push(item);
    }
  }
});

export function useStore () {
  return baseUseStore(key);
};