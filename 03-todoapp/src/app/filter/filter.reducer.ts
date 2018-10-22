import * as fromFiltro from './filter.actions';
import { from } from 'rxjs';


const estadoInicial: fromFiltro.filtrosValidos = 'todos';

export function filtroReducer( state = estadoInicial,
  action: fromFiltro.acciones): fromFiltro.filtrosValidos {

  switch (action.type) {
    case fromFiltro.SET_FILTER:
      return action.filtro;

    default:
      return state;
  }
}
