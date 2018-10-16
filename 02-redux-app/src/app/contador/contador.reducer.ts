// import { INCREMENTAR, DECREMENTAR, MULTIPLICAR, actions, DIVIDIR, RESET } from './contador.actions';

import * as contadorActions from './contador.actions';

export function contadorReducer( state: number = 10, action: contadorActions.actions ) {
  switch (action.type) {

    case contadorActions.INCREMENTAR:
      return state + 1;

    case contadorActions.DECREMENTAR:
      return state - 1;

    case contadorActions.MULTIPLICAR:
      return state * action.payload;

    case contadorActions.DIVIDIR:
      return state / action.payload;

    case contadorActions.RESET:
      return 0;

    default:
      return state;
  }
}
