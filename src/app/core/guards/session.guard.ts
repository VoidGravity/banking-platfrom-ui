import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const sessionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  //if (token && !this.authService.isTokenExpired(token)) {
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }


};
