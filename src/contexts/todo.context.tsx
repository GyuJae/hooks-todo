import React, { createContext } from "react";
import { useContext } from "react";
import { useReducer } from "react";

export interface ITodo {
  todo: string;
  id: string;
  complete: boolean;
}

export enum ActionKind {
  ADD = "add",
  Delete = "delete",
  COMPLETE = "status",
}

interface Action {
  type: ActionKind;
  payload: ITodo;
}

interface IState {
  todos: ITodo[] | never[];
}

const init = (initialTodos: IState) => {
  return {
    todos: initialTodos.todos,
  };
};

const initialTodos: IState = {
  todos: [],
};

const reducer = (state: IState, action: Action): IState => {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.ADD:
      return {
        todos: [...state.todos, payload],
      };
    case ActionKind.Delete:
      return { todos: state.todos.filter((item) => item.id !== payload.id) };
    case ActionKind.COMPLETE:
      return {
        todos: [
          ...state.todos.filter((todo) => todo.id !== payload.id),
          payload,
        ],
      };
    default:
      return state;
  }
};

interface IContext {
  state: IState;
  dispatch: React.Dispatch<Action> | null;
}

const ToDoContext = createContext<IContext>({
  state: initialTodos,
  dispatch: null,
});

export const ToDoContextProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialTodos, init);
  return (
    <ToDoContext.Provider value={{ state, dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDo = () => useContext(ToDoContext);
