import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Admin } from './admin';
import { Libros } from '../../../services/libros';
import { SignInService } from '../../../services/sign-in';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;
  let librosServiceSpy: jasmine.SpyObj<Libros>;
  let signinServiceSpy: jasmine.SpyObj<SignInService>;
  let mockToken: string;
  let mockDecodedToken: any;

  beforeAll(() => {
    mockToken = 'fake-jwt-token';
    mockDecodedToken = { nombre: 'Test User', admin: true };
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue(mockDecodedToken);
  });

  beforeEach(async () => {
    const librosSpy = jasmine.createSpyObj('Libros', [
      'getAllLibros',
      'getLibro',
      'delete',
      'agregar',
      'update'
    ]);
    const signinSpy = jasmine.createSpyObj('SignInService', ['adminValid']);

    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [
        { provide: Libros, useValue: librosSpy },
        { provide: SignInService, useValue: signinSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    librosServiceSpy = TestBed.inject(Libros) as jasmine.SpyObj<Libros>;
    signinServiceSpy = TestBed.inject(SignInService) as jasmine.SpyObj<SignInService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería inicializar el componente y cargar los libros al ejecutar ngOnInit', () => {
    const mockLibros = { data: [{ _id: '1', titulo: 'Libro Test' }] };
    librosServiceSpy.getAllLibros.and.returnValue(of(mockLibros));

    component.ngOnInit();

    expect(librosServiceSpy.getAllLibros).toHaveBeenCalled();
    expect(component.libros).toEqual(mockLibros.data);
    expect(component.userName).toBe(mockDecodedToken.nombre);
    expect(component.isAdmin).toBe(mockDecodedToken.admin);
  });

  it('Debería obtener un libro con handleSubmit', () => {
    const mockLibro = { data: { _id: '1', titulo: 'Libro 1' } };
    librosServiceSpy.getLibro.and.returnValue(of(mockLibro));
    component.crudForm.setValue({ _id: '1' });

    component.handleSubmit();

    expect(librosServiceSpy.getLibro).toHaveBeenCalledWith('1');
    expect(component.busqueda).toEqual(mockLibro.data);
    expect(component.busca).toBe('busca');
    expect(component.busco).toBe('');
  });

  it('Debería limpiar la búsqueda con vuelve()', () => {
    component.busqueda = { _id: '1' };
    component.vuelve();
    expect(component.busqueda).toBeNull();
  });

  it('Debería activar la bandera de agregar con handleAgregar()', () => {
    component.handleAgregar();
    expect(component.agrega).toBeTrue();
  });

  it('Debería eliminar un libro con eliminar', () => {
    librosServiceSpy.delete.and.returnValue(of({ detail: 'Eliminado' }));
    spyOn(window.location, 'reload');

    component.eliminar('1');

    expect(librosServiceSpy.delete).toHaveBeenCalledWith('1');
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('Debería manejar el agregado de un libro exitoso', () => {
    librosServiceSpy.agregar.and.returnValue(of({ detail: 'Agregado' }));
    spyOn(window.location, 'reload');
    component.agregando.setValue({
      titulo: 'Test',
      autor: 'Autor',
      calcetin: 'Calcetin',
      valor: '100',
      unidades: '10',
      _id: '1'
    });

    component.agregarLibro();

    expect(librosServiceSpy.agregar).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('Debería manejar error de ISBN duplicado al agregar libro', () => {
    const mockError = { status: 500 };
    librosServiceSpy.agregar.and.returnValue(throwError(() => mockError));
    spyOn(window, 'alert');

    component.agregando.setValue({
      titulo: 'Test',
      autor: 'Autor',
      calcetin: 'Calcetin',
      valor: '100',
      unidades: '10',
      _id: '1'
    });

    component.agregarLibro();

    expect(librosServiceSpy.agregar).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('El ISBN ya existe en la base de datos.');
  });

  it('Debería manejar error genérico al agregar libro', () => {
    const mockError = { status: 400 };
    librosServiceSpy.agregar.and.returnValue(throwError(() => mockError));
    spyOn(window, 'alert');

    component.agregarLibro();

    expect(librosServiceSpy.agregar).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ocurrió un error al guardar el libro.');
  });

  it('Debería preparar el formulario para actualizar un libro con handleActualizar', () => {
    const mockLibro = {
      _id: '1',
      titulo: 'Test',
      autor: 'Autor',
      calcetin: 'Calcetin',
      valor: 100,
      unidades: 5,
    };

    component.handleActualizar(mockLibro);

    expect(component.editandoId).toBe('1');
    expect(component.actualizara).toBeTrue();
    expect(component.actualizando.value).toEqual({
      titulo: 'Test',
      autor: 'Autor',
      calcetin: 'Calcetin',
      valor: "100",
      unidades: "5",
      _id: '1',
    });
  });

  it('Debería manejar libro vacío en handleActualizar', () => {
    const mockLibro: any = { _id: '2' };
    component.handleActualizar(mockLibro);
    expect(component.actualizando.value._id).toBe('2');
  });

  it('Debería actualizar un libro con actualizar', () => {
    librosServiceSpy.update.and.returnValue(of({ detail: 'Actualizado' }));
    spyOn(window.location, 'reload');

    component.actualizando.setValue({
      titulo: 'Test',
      autor: 'Autor',
      calcetin: 'Calcetin',
      valor: '100',
      unidades: '10',
      _id: '1'
    });

    component.actualizar('1');

    expect(librosServiceSpy.update).toHaveBeenCalledWith('1', component.actualizando.value);
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('Debería cancelar la edición con cancelarEdicion', () => {
    component.editandoId = '1';
    component.cancelarEdicion();
    expect(component.editandoId).toBeNull();
  });

  
  it('Debería inicializar con token inválido sin romper', () => {
    (JwtHelperService.prototype.decodeToken as jasmine.Spy).and.returnValue(null);
    librosServiceSpy.getAllLibros.and.returnValue(of({ data: [] }));

    expect(() => component.ngOnInit()).not.toThrow();
  });
});
