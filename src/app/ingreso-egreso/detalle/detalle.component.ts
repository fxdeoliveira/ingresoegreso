import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWhitIngreso } from '../ingreso-egreso.reducer';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
	ingresoEgresos: IngresoEgreso[] = [];
	ingrsub: Subscription;

	constructor(private store: Store<AppStateWhitIngreso>, private ingrseegresoser: IngresoEgresoService) {}

	ngOnInit(): void {
		this.ingrsub = this.store.select('ingresoEgreso').subscribe(({ items }) => (this.ingresoEgresos = items));
	}

	ngOnDestroy() {
		this.ingrsub.unsubscribe();
	}
	borrar(uid: string) {
		this.ingrseegresoser
			.borrarIE(uid)
			.then(() => Swal.fire('borrado', 'item borrado', 'success'))
			.catch((err) => Swal.fire('no borrado', err.mesagge, 'error'));
	}
}
