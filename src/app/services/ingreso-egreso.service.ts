import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { timeStamp } from 'console';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class IngresoEgresoService {
	constructor(private firestore: AngularFirestore, private authS: AuthService) {}

	crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
		return this.firestore
			.doc(`${this.authS.user.uid} XR3pAVc0h9UCYPjMbCRyXEkIbPq2/ingresosegresos`)
			.collection('items')
			.add({ ...ingresoEgreso });
	}
}
