
import { incrementadorAction, decrementadorAction, multiplicadorAction, divisorAction, resetAction } from "./contador/contador.actions";
import { contadorReducer } from "./contador/contador.reducer";


console.log(contadorReducer(10, incrementadorAction));

console.log(contadorReducer(10, decrementadorAction));

console.log(contadorReducer(10, multiplicadorAction));

console.log(contadorReducer(10, divisorAction));

console.log(contadorReducer(10, resetAction));

