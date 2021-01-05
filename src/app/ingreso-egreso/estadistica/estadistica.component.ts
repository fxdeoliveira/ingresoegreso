import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWhitIngreso } from '../ingreso-egreso.reducer';
@Component({
	selector: 'app-estadistica',
	templateUrl: './estadistica.component.html',
	styles: []
})
export class EstadisticaComponent implements OnInit {
	ingresoes: number = 0;
	egresos: number = 0;
	totalegre: number = 0;
	totalingre: number = 0;

	public doughnutChartLabels: Label[] = [ 'Ingresos', 'Egresos' ];
	public doughnutChartData: MultiDataSet = [ [] ];

	constructor(private store: Store<AppStateWhitIngreso>) {}

	ngOnInit(): void {
		this.store.select('ingresoEgreso').subscribe(({ items }) => {
			this.generarestadistica(items);
		});
	}

	generarestadistica(items: IngresoEgreso[]) {
		this.totalegre = 0;
		this.totalingre = 0;
		this.ingresoes = 0;
		this.egresos = 0;

		for (const item of items) {
			if (item.tipo === 'ingreso') {
				this.totalingre += item.monto;
				this.ingresoes++;
			} else {
				this.totalegre += item.monto;
				this.egresos++;
			}
		}
		this.doughnutChartData = [ [ this.totalingre, this.totalegre ] ];
	}
}
