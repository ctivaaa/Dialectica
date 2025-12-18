import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Registro } from './registro';

describe('Registro Service', () => {
  let service: Registro;
  let httpMock: HttpTestingController;
  let mockApiUrl: string;

  beforeAll(() => {
    mockApiUrl = 'http://localhost:4000/users/signUp';
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Registro]
    });
    service = TestBed.inject(Registro);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería registrar un usuario con POST /users/signUp', () => {
    // Arrange
    const mockUser = { email: 'test@email.com', password: '1234' };
    const mockResponse = { detail: 'Usuario registrado satisfactoriamente' };

    // Act
    service.registerUser(mockUser).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(mockApiUrl);
    req.flush(mockResponse);

    // Assert
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
  });
});
