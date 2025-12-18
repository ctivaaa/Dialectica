import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Libros {
    private httpClient = inject(HttpClient)
    private apiUrl = "http://18.188.13.209:4000/libros"

    getAllLibros() {
      return this.httpClient.get(this.apiUrl)
    }
     getLibro(id: any) {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }
    delete(id: any) {
      return this.httpClient.delete(`${this.apiUrl}/${id}`)
    }
    update(id: any, data: any ) {
      return this.httpClient.put(`${this.apiUrl}/${id}`, data)
    }
    agregar(req: any){
return this.httpClient.post(this.apiUrl, req)
} 
 
}
