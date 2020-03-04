import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  proxyurl = "https://cors-anywhere.herokuapp.com/";
  endpoint: string = 'http://127.0.0.1:8080/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  project_own_list = [];
  project_viewer_list = [];

  constructor(private http: HttpClient,public router: Router) { }

  get_project_own(user_id) : Observable<any[]> {
    return this.http.post<any>(`api/project_list.php`, user_id);  
  }

  get_project_view(user_id) : Observable<any[]> {
    return this.http.post<any>(`api/project_viewer_list.php`, user_id);  
  }



}
