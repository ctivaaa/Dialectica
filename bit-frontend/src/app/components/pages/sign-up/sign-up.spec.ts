// sign-up.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUp } from './sign-up';
import { Registro } from '../../../services/registro';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SignUp', () => {
  let component: SignUp;
  let fixture: ComponentFixture<SignUp>;
  let registroSpy: jasmine.SpyObj<Registro>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockName: string;
  let mockEmail: string;
  let mockPassword: string;

  beforeAll(() => {
    mockName = 'Usuario Test';
    mockEmail = 'test@email.com';
    mockPassword = '123456';
  });

  beforeEach(async () => {
    registroSpy = jasmine.createSpyObj('Registro', ['registerUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [SignUp],
      providers: [
        { provide: Registro, useValue: registroSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería registrar un usuario y navegar a /login cuando las contraseñas coinciden', () => {
    // Arrange
    registroSpy.registerUser.and.returnValue(of({ detail: 'ok' }));

    component.registerForm.patchValue({
      nombre: mockName,
      correo: mockEmail,
      contrasena: mockPassword,
      contrasena2: mockPassword
    });

    // Act
    component.handleSubmit();

    // Assert
    expect(registroSpy.registerUser).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('Debería mostrar un alert si las contraseñas no coinciden', () => {
    // Arrange
    spyOn(window, 'alert');
    component.registerForm.patchValue({
      nombre: mockName,
      correo: mockEmail,
      contrasena: '11111',
      contrasena2: '22222'
    });

    // Act
    component.handleSubmit();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('las contraseñas no coinciden');
    expect(registroSpy.registerUser).not.toHaveBeenCalled();
  });

  it('Debería mostrar un alert si el formulario está incompleto', () => {
    // Arrange
    spyOn(window, 'alert');
    component.registerForm.patchValue({
      nombre: '',
      correo: '',
      contrasena: '',
      contrasena2: ''
    });

    // Act
    component.handleSubmit();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('rellene todos los formularios');
    expect(registroSpy.registerUser).not.toHaveBeenCalled();
  });
});
