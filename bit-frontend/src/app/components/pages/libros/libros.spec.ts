import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { LibrosPage } from './libros';
import { Libros } from '../../../services/libros';
import { SignInService } from '../../../services/sign-in';

// Mock de LibrosService
class LibrosMock {
  getAllLibros = jasmine.createSpy().and.returnValue(of({ data: [{ _id: '1', titulo: 'Libro 1' }] }));
  getLibro = jasmine.createSpy().and.returnValue(of({ data: { _id: '1', titulo: 'Libro buscado' } }));
}

describe('LibrosPage', () => {
  let component: LibrosPage;
  let fixture: ComponentFixture<LibrosPage>;
  let librosService: LibrosMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LibrosPage],
      providers: [
        { provide: Libros, useClass: LibrosMock },
        { provide: SignInService, useValue: {} },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LibrosPage);
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

  it('debería obtener un libro con handleSubmit()', () => {
    component.buscando.setValue({ _id: '1' });
    component.handleSubmit();
    expect(librosService.getLibro).toHaveBeenCalledWith('1');
    expect(component.busqueda).toEqual({ _id: '1', titulo: 'Libro buscado' });
  });

  it('no debería llamar getLibro si el form es inválido', () => {
    component.buscando.setValue({ _id: '' }); // inválido
    component.handleSubmit();
    expect(librosService.getLibro).not.toHaveBeenCalled();
  });

  it('debería limpiar la búsqueda con vuelve()', () => {
    component.busqueda = { _id: '1', titulo: 'Libro 1' };
    component.vuelve();
    expect(component.busqueda).toBeNull();
  });
});
