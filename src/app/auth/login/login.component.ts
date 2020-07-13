import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as  action  from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginform: FormGroup;
  cargando: boolean = false;
  uiSubs: Subscription;

  constructor(private fb: FormBuilder,
    private aService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.uiSubs = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(){
    this.uiSubs.unsubscribe();
  }

  login() {

    if(this.loginform.invalid) {return;}

    this.store.dispatch(action.isLoading());
      
/* Swal.fire({
  title: 'Cargando...',
  onBeforeOpen: () => {
    Swal.showLoading()    
  }
});     */
    
    const {email, password} = this.loginform.value;

    this.aService.login(email,password)
    .then(login => {
      /* Swal.close(); */
      this.store.dispatch(action.stopLoading());
      this.router.navigate(['/']);
    })
    .catch(err=> { 
      this.store.dispatch(action.stopLoading());
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message      
    })
  });
  }

}
