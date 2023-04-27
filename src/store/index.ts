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
    },
    deleteToDoItem({ commit }, timeStamp: string) {
      commit('DELETE_TO_DO_ITEM', timeStamp);
    }
  },
  mutations: {
    ADD_TO_DO_ITEM(state: State, item: ToDoItem) {
      state.toDoArray.push(item);
    },
    DELETE_TO_DO_ITEM(state: State, timeStamp: string) {
      let index = state.toDoArray.findIndex(item => item.timeStamp === timeStamp);
      state.toDoArray.splice(index, 1);
    }
  }
});

export function useStore () {
  return baseUseStore(key);
};