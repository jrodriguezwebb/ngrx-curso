import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-agreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();
  constructor( private store: Store<AppState>, public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.store.select('ingresoEgreso').subscribe( ingresoEgreso => {
      this.items = ingresoEgreso.items;
    });
  }

  borrarItem( item: IngresoEgreso) {
    console.log(item);
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid).then(() => {
      Swal.fire({
        type: 'success',
        title: 'Eliminado',
        text: item.descripcion
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
