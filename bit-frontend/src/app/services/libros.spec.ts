import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Libros } from './libros';

describe('Libros Service', () => {
  let service: Libros;
  let httpMock: HttpTestingController;
  let mockApiUrl: string;

  beforeAll(() => {
    mockApiUrl = 'http://localhost:4000/libros';
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Libros]
    });
    service = TestBed.inject(Libros);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería obtener todos los libros con GET /libros', () => {
    // Arrange
    const mockLibros: any[] = [{ id: 1, titulo: 'Libro 1' }, { id: 2, titulo: 'Libro 2' }];

    // Act
    service.getAllLibros().subscribe((res) => {
      expect(res).toEqual(mockLibros);
    });

    const req = httpMock.expectOne(mockApiUrl);
    req.flush(mockLibros);

    // Assert
    expect(req.request.method).toBe('GET');
  });

  it('Debería obtener un libro con GET /libros/:id', () => {
    // Arrange
    const mockLibro = { id: 1, titulo: 'Libro 1' };

    // Act
    service.getLibro(1).subscribe((res) => {
      expect(res).toEqual(mockLibro);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/1`);
    req.flush(mockLibro);

    // Assert
    expect(req.request.method).toBe('GET');
  });

  it('Debería eliminar un libro con DELETE /libros/:id', () => {
    // Arrange
    const mockResponse = { detail: 'Libro eliminado' };

    // Act
    service.delete(1).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/1`);
    req.flush(mockResponse);

    // Assert
    expect(req.request.method).toBe('DELETE');
  });

  it('Debería actualizar un libro con PUT /libros/:id', () => {
    // Arrange
    const mockUpdate = { titulo: 'Libro actualizado' };
    const mockResponse = { detail: 'Libro actualizado correctamente' };

    // Act
    service.update(1, mockUpdate).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/1`);
    req.flush(mockResponse);

    // Assert
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUpdate);
  });

  it('Debería agregar un libro con POST /libros', () => {
    // Arrange
    const mockLibro = { titulo: 'Libro nuevo' };
    const mockResponse = { detail: 'Libro agregado correctamente' };

    // Act
    service.agregar(mockLibro).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(mockApiUrl);
    req.flush(mockResponse);

    // Assert
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLibro);
  });
});
