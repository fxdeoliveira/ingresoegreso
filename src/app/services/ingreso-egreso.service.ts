import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class IngresoEgresoService {
	constructor(private firestore: AngularFirestore, private authS: AuthService) {}

	crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
		console.log(this.authS.user.uid);
		return this.firestore
			.doc(`${this.authS.user.uid}/ingresosegresos`)
			.collection('items')
			.add({ ...ingresoEgreso });
	}

	initIngresoEgresosListener(uid: string) {
		return this.firestore.collection(`${uid}/ingresosegresos/items`).snapshotChanges().pipe(
			map((snapshot) => {
				return snapshot.map((doc) => {
					return {
						uid: doc.payload.doc.id,
						...doc.payload.doc.data() as any
					};
				});
			})
		);
	}
}
