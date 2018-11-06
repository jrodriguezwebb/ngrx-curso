import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = [ 'todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  pendientes: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.pendientes = this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(filtro: fromFiltro.filtrosValidos) {
    const action = new fromFiltro.SetFiltroAction(filtro);
    this.store.dispatch(action);
  }

  contarPendientes(todos: Todo[]): number {
    return todos.filter( todo => !todo.completado ).length;
  }

  borrarTodo() {
    const action = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch(action);
  }

}
