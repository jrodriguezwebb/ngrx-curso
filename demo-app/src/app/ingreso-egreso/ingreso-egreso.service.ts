import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-agreso.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private afDB: AngularFirestore,
               public authService: AuthService,
               private store: Store<AppState>) { }

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemSubscription: Subscription = new Subscription();

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user !== null))
      .subscribe( auth => this.ingresoEgresoItems(auth.user.uid));
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    return this.afDB.doc(`${this.authService.getUsuario().uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }

  cancelarSubscriptions() {
    this.ingresoEgresoItemSubscription.unsubscribe();
    this.ingresoEgresoListenerSubscription.unsubscribe();
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemSubscription = this
      .afDB
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( docData => {
          return docData.map((doc) => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
          });
        })
      )
      .subscribe((collection: any[]) => {
        this.store.dispatch( new SetItemsAction(collection));
        console.log(collection);
      });
  }
}
