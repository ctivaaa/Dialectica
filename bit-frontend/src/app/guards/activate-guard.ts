import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SignInService } from '../services/sign-in';



export const activateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const signinService = inject(SignInService)

if(signinService.adminValid()){
return true
}
else{
  router.navigateByUrl("/login")
  return false
}


}