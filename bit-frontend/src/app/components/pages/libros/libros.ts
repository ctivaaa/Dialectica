import { Component, inject, OnInit } from '@angular/core';
import { Libros } from '../../../services/libros';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SignInService } from '../../../services/sign-in';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-libros',
  imports: [DecimalPipe, ReactiveFormsModule],
  templateUrl: './libros.html',
  styleUrl: './libros.css'
})
export class LibrosPage {
 signinService = inject(SignInService);
  private librosService = inject(Libros);

  
  router = inject(Router)
  libros!: any[];
  busqueda!: any
  

  buscando = new FormGroup({
    _id: new FormControl("", Validators.required),
  })


  //GET ALL
  ngOnInit(): void {

    this.librosService.getAllLibros().subscribe((res: any) => {
      this.libros = res.data;
       
    });


  }


   handleSubmit(){
    if (this.buscando.valid) { 
      this.librosService.getLibro(this.buscando.value._id).subscribe((res: any) => {
        this.busqueda = res.data
        // this.busca = "busca"
        // this.busco = ""
      });
    } 
  } 

vuelve(){
    this.busqueda= null
  }
  


}
