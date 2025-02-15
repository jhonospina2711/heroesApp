import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.services';

@Injectable({providedIn: 'root'})
export class PublicGuard {
    constructor(
        private authService: AuthService,
        private router: Router
      ) { }

    private checkAuthStatus(): Observable<boolean> | boolean {
      return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
        tap( isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['./']);
          }
        }),
        map( isAuthenticated => !isAuthenticated)
      )

    }

  canMatch: CanMatchFn = (route: Route, segments: UrlSegment[]): Observable<boolean> | boolean => {
      // console.log('Can Match');
      // console.log({ route, segments });
      return this.checkAuthStatus();
    }

    canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {
      // console.log('Can Activate');
      // console.log({ route, state });
      return this.checkAuthStatus();
    }

}
