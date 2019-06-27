import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-agreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';
  loadingSubscription: Subscription;
  cargando: boolean;

  constructor(public ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
    this.form = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgreso({
      ...this.form.value,
      tipo: this.tipo
    });
    this.store.dispatch(new ActivarLoadingAction());
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      this.form.reset({ monto: 0 });
      Swal.fire({
        type: 'success',
        title: 'Registrado',
        text: ingresoEgreso.descripcion
      });
      this.store.dispatch(new DesactivarLoadingAction());
    })
    .catch( err => {
      console.log(err);
      this.store.dispatch(new DesactivarLoadingAction());
    });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
