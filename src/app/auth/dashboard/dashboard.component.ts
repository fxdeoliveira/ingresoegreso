import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ingresoEgresoActions from 'src/app/ingreso-egreso/ingresos-egresos.actions';

import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
	userSubs: Subscription;
	ingresosEgresos: Subscription;

	constructor(private store: Store<AppState>, private ingresoegresoservice: IngresoEgresoService) {}

	ngOnInit(): void {
		this.userSubs = this.store.select('user').pipe(filter((auth) => auth.user != null)).subscribe((user) => {
			this.ingresosEgresos = this.ingresoegresoservice
				.initIngresoEgresosListener(user.user.uid)
				.subscribe((ingresosEgresos) => {
					this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosEgresos }));
				});
		});
	}

	ngOnDestroy(): void {
		this.ingresosEgresos.unsubscribe();
		this.userSubs.unsubscribe();
	}
}
