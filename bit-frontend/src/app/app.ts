import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/shared/nav/nav';
import { Footer } from './components/shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
