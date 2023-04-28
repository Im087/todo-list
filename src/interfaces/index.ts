export interface ToDoItem {
  itemStatus: boolean,
  isDisabled: boolean,
  timeStamp: string,
  toDoContent: string
};

export interface State {
  toDoArray: ToDoItem[]
};
