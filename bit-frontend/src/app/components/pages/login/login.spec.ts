import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Login } from './login';
import { SignInService } from '../../../services/sign-in';

class RouterMock {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

class SignInMock {
  loginUser = jasmine.createSpy('loginUser');
}

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let signinMock: SignInMock;
  let routerMock: RouterMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: Router, useClass: RouterMock },
        { provide: SignInService, useClass: SignInMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    signinMock = TestBed.inject(SignInService) as unknown as SignInMock;
    routerMock = TestBed.inject(Router) as unknown as RouterMock;

    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('handleSubmit inválido muestra alerta', () => {
    component.loginForm.setValue({ correo: '', contrasena: '' });
    spyOn(window, 'alert');

    component.handleSubmit();

    expect(window.alert).toHaveBeenCalledWith('ingrese datos validos');
    expect(signinMock.loginUser).not.toHaveBeenCalled();
  });

  it('handleSubmit válido guarda token y navega', () => {
    component.loginForm.setValue({ correo: 'a@a.com', contrasena: '123' });
    const response = { data: 'fake-token' };
    signinMock.loginUser.and.returnValue(of(response));
    spyOn(localStorage, 'setItem');

    component.handleSubmit();

    expect(signinMock.loginUser).toHaveBeenCalledWith({
      correo: 'a@a.com',
      contrasena: '123',
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/inicio');
  });

  it('handleSubmit con error del servicio no rompe', () => {
    component.loginForm.setValue({ correo: 'a@a.com', contrasena: '123' });
    signinMock.loginUser.and.returnValue(throwError(() => ({ status: 500 })));

    expect(() => component.handleSubmit()).not.toThrow();
  });
});
