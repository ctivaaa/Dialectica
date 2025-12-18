import { Component, inject, OnInit } from '@angular/core';
import { Libros } from '../../../services/libros';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SignInService } from '../../../services/sign-in';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-inicio',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
 signinService = inject(SignInService);
  private librosService = inject(Libros);

  
  router = inject(Router)
  libros!: any[];
  busqueda!: any
  


  //GET ALL
  ngOnInit(): void {

    this.librosService.getAllLibros().subscribe((res: any) => {
      this.libros = res.data;
    });


  }

  
 
}