import { createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './ingresos-egresos.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
	items: IngresoEgreso[];
}

export interface AppStateWhitIngreso extends AppState {
	ingresoEgreso: State;
}

export const initialState: State = {
	items: []
};

const _ingresoEgresoReducer = createReducer(
	initialState,
	on(setItems, (state, { items }) => ({ ...state, items: [ ...items ] })),
	on(unsetItems, (state) => ({ ...state, items: [] }))
);

export function ingresoEgresoReducer(state, action) {
	return _ingresoEgresoReducer(state, action);
}
