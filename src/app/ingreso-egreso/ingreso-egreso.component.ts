import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/ui.actions';

@Component({
	selector: 'app-ingreso-egreso',
	templateUrl: './ingreso-egreso.component.html',
	styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
	ingrseForm: FormGroup;
	tipo: string = 'ingreso';
	cargando: boolean = false;
	loadingsub: Subscription;

	constructor(
		private fb: FormBuilder,
		private ingrseegresosserv: IngresoEgresoService,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		this.loadingsub = this.store.select('ui').subscribe((ui) => (this.cargando = ui.isLoading));

		this.ingrseForm = this.fb.group({
			descripcion: [ '', Validators.required ],
			monto: [ '', Validators.required ]
		});
	}

	ngOnDestroy() {
		this.loadingsub.unsubscribe();
	}

	guardar() {
		this.store.dispatch(ui.isLoading());

		const { descripcion, monto } = this.ingrseForm.value;

		const ingresoegreso = new IngresoEgreso(descripcion, monto, this.tipo);
		this.ingrseegresosserv
			.crearIngresoEgreso(ingresoegreso)
			.then(() => {
				this.ingrseForm.reset();
				this.store.dispatch(ui.stopLoading());
				Swal.fire('Registro creado!', descripcion, 'success');
			})
			.catch((err) => {
				this.store.dispatch(ui.stopLoading());
				Swal.fire('Error!', err.message, 'error');
			});
	}
}
