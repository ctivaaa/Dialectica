// sign-in.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { SignInService } from './sign-in';

describe('SignInService', () => {
  let service: SignInService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  const apiUrl = 'http://localhost:4000/users/sign-in';

  /**
   * Tokens JWT "fake" pero con payload base64-url válido.
   * payload1 -> { admin: true, nombre: "Juan" }
   * payload2 -> { admin: false, nombre: "Pedro" }
   *
   * Nota: la firma (tercera parte) es 'signature' porque no la necesitamos para decodeToken.
   */
  const tokenAdminTrue =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwibm9tYnJlIjoiSnVhbiJ9.signature';
  const tokenAdminFalse =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsIm5vbWJyZSI6IlBlZHJvIn0.signature';

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SignInService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(SignInService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' debería hacer POST a /users/sign-in con el body correcto', () => {
    const mockRequest = { email: 'test@email.com', password: '1234' };
    const mockResponse = { token: 'cualquier-token' };

    service.loginUser(mockRequest).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  it(' debería retornar true si existe token', () => {
    localStorage.setItem('token', 'algún-token');
    expect(service.userValid()).toBeTrue();
  });

  it(' debería retornar false si NO existe token', () => {
    localStorage.removeItem('token');
    expect(service.userValid()).toBeFalse();
  });

  it(' debería retornar true y setear admin/nombre cuando admin=true (token válido)', () => {
    // Guardamos token con payload admin: true
    localStorage.setItem('token', tokenAdminTrue);

    const result = service.adminValid();

    expect(result).toBeTrue();
    expect(service.admin).toBeTrue();
    expect(service.nombre).toBe('Juan');
  });

  it(' debería retornar false y setear admin/nombre cuando admin=false (token válido)', () => {
    // Guardamos token con payload admin: false
    localStorage.setItem('token', tokenAdminFalse);

    const result = service.adminValid();

    expect(result).toBeFalse();
    expect(service.admin).toBeFalse();
    expect(service.nombre).toBe('Pedro');
  });

  it(' debería eliminar token y navegar a "/"', () => {
    localStorage.setItem('token', 'cualquier-token');
    service.logoutUser();
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
