import * as fromTodo from './todo.actions';
import { Todo } from './todo.model';


const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el mundo');

const estadoInicial: Todo[] = [todo1, todo2];

export function todoReducer(state = estadoInicial,
                            action: fromTodo.Acciones): Todo[] {
  switch (action.type ) {
    case fromTodo.AGREGAR_TODO:
      const todo = new Todo(action.texto);
      return [ ...state, todo ];
    default:
      return state;
  }

}
