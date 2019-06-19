import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-agreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private afDB: AngularFirestore,
               public authService: AuthService) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    this.afDB.doc(`${this.authService.getUsuario().uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso})
      .then()
      .catch( err => {
        console.log(err);
      });
  }
}
