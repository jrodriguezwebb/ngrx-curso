import { Todo } from './todo/todo.model';
import { ActionReducerMap } from '@ngrx/store';
import { todoReducer } from './todo/todo.reducer';
import { filtroReducer } from './filter/filter.reducer';
import { filtrosValidos } from './filter/filter.actions';

export interface AppState {
  todos: Todo[];
  filtro: filtrosValidos;
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filtro: filtroReducer
};
