import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Registro {
private httpClient = inject(HttpClient);
private apiUrl = "http://18.188.13.209:4000/users/signUp"

registerUser(req: any){
return this.httpClient.post(this.apiUrl, req)
} 
}
