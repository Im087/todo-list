export interface ToDoItem {
  itemStatus: boolean,
  timeStamp: string,
  toDoContent: string
};

export interface State {
  toDoArray: ToDoItem[]
};
