import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  // canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot)
  //  : Observable<boolean> | Promise<boolean> | boolean {
  //   if (this.authService.isLoggedIn !== true) {
  //     window.alert("Access not allowed!");
  //     this.router.navigate(['/'])
  //   }
  //   return true;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("guard");
    const currentUser = this.authService.currentUser;
    console.log("current" + currentUser);
    console.log("islogin" + this.authService.isLoggedIn);
    if (currentUser && this.authService.isLoggedIn) {
        // authorised so return true
        return true;
    }else{
      window.alert("Access not allowed!");
      this.router.navigate(['/'])
    }

    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    // return false;
  }
}