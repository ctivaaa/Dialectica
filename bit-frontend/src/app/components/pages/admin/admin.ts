import { Component, inject, OnInit } from '@angular/core';
import { Libros } from '../../../services/libros';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SignInService } from '../../../services/sign-in';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DecimalPipe} from '@angular/common';



 

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, DecimalPipe, ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  signinService = inject(SignInService);
  private librosService = inject(Libros);

  editandoId: any = null;
  busca!: any 
  router = inject(Router)
  userName!: string;
  isAdmin!: boolean;
  libros!: any[];
  busqueda!: any
  busco!: any 
  agrega!: any
  actualizara!: any

crudForm = new FormGroup({
    _id: new FormControl("", Validators.required),
  })
 
  agregando= new FormGroup({
    titulo: new FormControl("", Validators.required),
    autor: new FormControl("", Validators.required),
    calcetin: new FormControl("", Validators.required),
    valor: new FormControl("", Validators.required),
    unidades: new FormControl("", Validators.required),
    _id: new FormControl("", Validators.required)
  })

  actualizando = new FormGroup({
    titulo: new FormControl(""),
    autor: new FormControl(""),
    calcetin: new FormControl(""),
    valor: new FormControl(""),
    unidades: new FormControl(""),
    _id: new FormControl("")
  })


  //GET ALL
  ngOnInit(): void {
    const token: any = localStorage.getItem("token");
    const tokenDecoded = jwtHelperService.decodeToken(token);

    this.userName = tokenDecoded.nombre;
    this.isAdmin = tokenDecoded.admin; 

    this.busca = ""
    this.busco = "busco"

    this.librosService.getAllLibros().subscribe((res: any) => {
      this.libros = res.data;
    });


  }

  
  //GET ONE
  handleSubmit(){
    if (this.crudForm.valid) { 
      this.librosService.getLibro(this.crudForm.value._id).subscribe((res: any) => {
        this.busqueda = res.data
        this.busca = "busca"
        this.busco = ""
      });
    } 
  } 



  vuelve(){
    this.busqueda= null
  }
  

  //DELETE
  eliminar(id: any){
      this.librosService.delete(id).subscribe((res: any) => {
       window.location.reload();

       });
  }

  //PO
  handleAgregar(){
    this.agrega = true
  }

  agregarLibro(){

    this.librosService.agregar(this.agregando.value).subscribe({
  next: (res: any) => {
    window.location.reload(); 
  },

     error: (err) => {
    if (err.status === 500 ) {
      alert("El ISBN ya existe en la base de datos.");
    } else {
      alert("Ocurrió un error al guardar el libro.");
    }
  }
});
  }
  //PUT

  handleActualizar(libro: any){
  this.actualizara = true;
  this.editandoId = libro._id;

  this.actualizando.setValue({
    titulo: libro.titulo || "",
    autor: libro.autor || "",
    calcetin: libro.calcetin || "",
    valor: libro.valor || 0,
    unidades: libro.unidades || 0,
    _id: libro._id || ""
  });
}


actualizar(id: any){
  this.librosService.update(id, this.actualizando.value).subscribe((res: any)=> {
   
    window.location.reload(); 
  });
}




cancelarEdicion() {
  this.editandoId = null;
}

}