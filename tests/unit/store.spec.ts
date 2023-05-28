import { describe, test, expect, vi } from 'vitest';
import { getters, actions, mutations } from '../../src/store';

describe('store/index.ts', () => {
  const timeStamp = new Date().toISOString();
  const toDoItem = {
    itemStatus: false,
    isDisabled: true,
    timeStamp,
    toDoContent: 'todo',
  };

  describe('getters', () => {
    const state = {
      toDoArray: [toDoItem]
    };

    test('getToDoArray is OK', () => {
      expect(getters.getToDoArray(state)).toEqual([toDoItem]);
    });
  });

  describe('actions', () => {
    const commit = vi.fn();

    test('addToDoItem is OK', () => {
      actions.addToDoItem({commit}, toDoItem);
      expect(commit).toBeCalledWith('ADD_TO_DO_ITEM', toDoItem);
    });
    test('deleteToDoItem is OK', () => {
      actions.deleteToDoItem({commit}, timeStamp);
      expect(commit).toBeCalledWith('DELETE_TO_DO_ITEM', timeStamp);
    });
  });

  describe('mutations', () => {
    const state = {
      toDoArray: []
    };

    test('ADD_TO_DO_ITEM is OK', () => {
      mutations.ADD_TO_DO_ITEM(state, toDoItem);
      expect(state.toDoArray).toEqual([toDoItem]);
    });
    test('DELETE_TO_DO_ITEM is OK', () => {
      mutations.DELETE_TO_DO_ITEM(state, timeStamp);
      expect(state.toDoArray).toEqual([]);
    });
  });
});