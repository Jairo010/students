import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
/*
  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean | UrlTree>((resolve) => {
      // Mostrar mensaje de verificación
      const snackBarRef = this.snackBar.open('Verifying your session, please wait...', '', {
        duration: 3000, // La duración del timeout
      });

      const timeout = setTimeout(() => {
        snackBarRef.dismiss();
        this.snackBar.open('You must be logged in to access this page.', '', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
        resolve(false);
      }, 3000); // 3000 ms = 3 segundos

      this.authService.isAuthenticated().then(isAuth => {
        clearTimeout(timeout);
        snackBarRef.dismiss();
        if (isAuth) {
          resolve(true);
        } else {
          this.snackBar.open('You must be logged in to access this page.', '', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
    */
}
