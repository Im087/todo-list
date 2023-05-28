import { createStore } from 'vuex';
import type { State, ToDoItem } from '@/interfaces';

export const getters = {
  getToDoArray(state: State) {
    return state.toDoArray;
  }
};

export const actions = {
  addToDoItem({ commit }, item: ToDoItem) {
    commit('ADD_TO_DO_ITEM', item);
  },
  deleteToDoItem({ commit }, timeStamp: string) {
    commit('DELETE_TO_DO_ITEM', timeStamp);
  }
};

export const mutations = {
  ADD_TO_DO_ITEM(state: State, item: ToDoItem) {
    state.toDoArray.push(item);
  },
  DELETE_TO_DO_ITEM(state: State, timeStamp: string) {
    let index = state.toDoArray.findIndex(item => item.timeStamp === timeStamp);
    state.toDoArray.splice(index, 1);
  }
};

export default createStore<State>({
  state: {
    toDoArray: []
  },
  getters,
  actions,
  mutations
});
