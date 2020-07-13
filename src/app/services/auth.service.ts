import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authaction from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(public auth: AngularFireAuth,
              public firestore: AngularFirestore,
              private store: Store<AppState>
    ) { }

  initAuthListener(){

    this.auth.authState.subscribe(fuser =>{

      if(fuser){
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (fireuser: any) => {
          const user  =  Usuario.fromfirestore(fireuser);
          this.store.dispatch(authaction.setUser({user}) );
        })       
      }else{
        this.userSubscription.unsubscribe();
        this.store.dispatch(authaction.unsetUser());
      }
      
    })
  }

  crearUsuario(nombre: string, email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
    .then(({user}) => {
      const newUser = new Usuario( user.uid, nombre, user.email);
      return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
    })
  }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    );
  }
}
