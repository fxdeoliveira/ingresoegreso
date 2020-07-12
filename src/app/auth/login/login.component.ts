import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateEventsArray } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;

  constructor(private fb: FormBuilder,
    private aService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    })
  }

  login() {

    if(this.loginform.invalid) {return;}


Swal.fire({
  title: 'Cargando...',
  onBeforeOpen: () => {
    Swal.showLoading()    
  }
});    
    
    const {email, password} = this.loginform.value;

    this.aService.login(email,password)
    .then(login => {
      Swal.close();
      this.router.navigate(['/']);
    })
    .catch(err=> Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message      
    }));
  }

}
