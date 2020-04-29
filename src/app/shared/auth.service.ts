import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  proxyurl = "https://cors-anywhere.herokuapp.com/";
  endpoint: string = 'http://127.0.0.1:8080/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser = {};

  constructor(private http: HttpClient,public router: Router) { }

  // Sign-up
  register(user): Observable<any> {
    let api = `api/register.php`;
  
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  check_email (email) : Observable<any> {
    return this.http.post<any>(`api/register_email.php`, JSON.stringify(email));  
  }

  // Sign-in
  login(user) {
    return this.http.post<any>(`api/login.php`, user)
      .subscribe((res: any) => {
        //console.log(res);
        localStorage.setItem('token', res[0].id);
        this.currentUser = res;
        this.router.navigate(['/dashboard']);
        // return this.isLoggedIn;
        // this.router.navigate(['/dashboard/', res[0].id ]);
        
        // this.getUserProfile(res[0].id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['user-profile/' + res.msg.id]);
        // })
      })
  }

  login2(user): Observable<any> {
    return this.http.post<any>(`api/login.php`, user);
      // .subscribe((res: any) => {
      //   //console.log(res);
      //   localStorage.setItem('token', res[0].id);
      //   this.currentUser = res;
      //   this.router.navigate(['/dashboard']);
      // })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    //console.log("gettoken"+localStorage.getItem('token'));
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('token');
    if (this.router.url === "/home-page"){
      location.reload();
    }
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
    this.router.navigate(['/home-page']);
  }

  updateUser(param):Observable<any> {
    return this.http.post<any>(`api/user_update.php`, param);
  }
  
  // User profile
  getUserProfile(id): Observable<any> {
    return this.http.post<any>(`api/user_profile.php`, id);
    // let api = `api/user_profile/${id}`;
    // return this.http.get(api, { headers: this.headers }).pipe(
    //   map((res: Response) => {
    //     return res || {}
    //   }),
    //   catchError(this.handleError)
    // )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
