import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { Inicio } from './inicio';
import { Libros } from '../../../services/libros';
import { SignInService } from '../../../services/sign-in';

// Mock de LibrosService
class LibrosMock {
  getAllLibros = jasmine.createSpy().and.returnValue(of({ data: [{ _id: '1', titulo: 'Libro 1' }] }));
}

describe('InicioComponent', () => {
  let component: Inicio;
  let fixture: ComponentFixture<Inicio>;
  let librosService: LibrosMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inicio], // standalone component
      providers: [
        { provide: Libros, useClass: LibrosMock },
        { provide: SignInService, useValue: {} },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Inicio);
    component = fixture.componentInstance;
    librosService = TestBed.inject(Libros) as unknown as LibrosMock;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar todos los libros en ngOnInit()', () => {
    expect(librosService.getAllLibros).toHaveBeenCalled();
    expect(component.libros.length).toBe(1);
    expect(component.libros[0].titulo).toBe('Libro 1');
  });
});
