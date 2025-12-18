import { Component } from '@angular/core';
import { Inicio } from '../inicio/inicio';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  imports: [Inicio, RouterLink],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {

}
