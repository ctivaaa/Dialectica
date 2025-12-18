import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Registro } from '../../../services/registro';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  router = inject (Router)
registro = inject(Registro)
contraIcorrecta: boolean = false
  mostrarPassword: boolean = false;

  registerForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    correo: new FormControl("", Validators.required),
    contrasena: new FormControl("", Validators.required),
    contrasena2: new FormControl("", Validators.required)
  })
  handleSubmit(){
console.log("FORMULARIO:", this.registerForm.value);
    if (this.registerForm.valid){
      if(this.registerForm.value.contrasena === this.registerForm.value.contrasena2)
{
 
      this.registro.registerUser(this.registerForm.value).subscribe((res: any)=>{
        console.log(res);
       
          this.router.navigateByUrl("/login")
        
      })                                

    } else {
alert("las contraseñas no coinciden") //TODO: Mejorar
    }
  } else{
    alert("rellene todos los formularios") //TODO: Mejorar
  }
}

 

}
