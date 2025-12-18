
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInService } from '../../../services/sign-in';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    router = inject(Router);
  signinService = inject(SignInService);

  loginForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });
  

  handleSubmit() {
    if (this.loginForm.valid) { 
      this.signinService.loginUser(this.loginForm.value).subscribe((res: any) => {
          
            
            localStorage.setItem('token', res.data);
            this.router.navigateByUrl("/inicio")
        });
    } else {
      // TODO: MEJORAR
      alert('ingrese datos validos');
    }
  }
}