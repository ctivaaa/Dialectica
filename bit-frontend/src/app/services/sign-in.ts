import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  admin = false
  nombre = ""
private router = inject(Router);
private httpClient = inject(HttpClient);
private apiUrl = "http://18.188.13.209:4000/users/sign-in"

loginUser(req: any){
return this.httpClient.post(this.apiUrl, req)
} 

userValid(){
if(localStorage.getItem("token")){
return true
}
else{
  return false
}
}
adminValid(){ 
    const jwtHelperService = new JwtHelperService();
  const token: any = localStorage.getItem("token")
  const decodeToken = jwtHelperService.decodeToken(token);
  this.admin = decodeToken.admin
  this.nombre = decodeToken.nombre


if(this.admin){
return true
}
else{
  return false
}
}
logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
