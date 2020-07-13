import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducers';
import * as auth from './auth/auth.reducer';
import { AuthGuard } from './services/auth.guard';


export interface AppState {
   ui :  ui.State
   user :  auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui : ui.uiReducer,
   user: auth.authReducer
}