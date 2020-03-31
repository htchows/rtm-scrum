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

  constructor(private http: HttpClient,public router: Router) { }

  //PROJECT
  get_project_own(user_id) : Observable<any[]> {
    return this.http.post<any>(`api/project_list.php`, user_id);  
  }

  get_project_view(user_id) : Observable<any[]> {
    return this.http.post<any>(`api/project_viewer_list.php`, user_id);  
  }

  get_project_detail(prj_id) : Observable<any[]> {
    return this.http.post<any>(`api/project_detail.php`, JSON.stringify(prj_id));  
  }

  //PRODUCT BACKLOG
  get_product_backlog(prj_id) : Observable<any[]> {
    return this.http.post<any>(`api/product_backlog_list.php`, JSON.stringify(prj_id));  
  }

  //SPRINT BACKLOG
  get_sprint_backlog_list(prj_id) : Observable<any[]> {
    return this.http.post<any>(`api/sprint_backlog_list.php`, JSON.stringify(prj_id));  
  }

  get_sprint_backlog_detail(prj_id,sb_id) : Observable<any[]> {
    const params = { 'prj_id': prj_id, 'sb_id': sb_id}
    return this.http.post<any>(`api/sprint_backlog_detail.php`, params);  
  }

  get_sprint_backlog_item(prj_id,pb_id,sb_id,sb_item_id) : Observable<any[]> {
    const params = { 
      'prj_id': prj_id,
      'pb_id':pb_id,
      'sb_id': sb_id,
      'sb_item_id':sb_item_id
    }
    return this.http.post<any>(`api/sprint_backlog_get_item.php`, params);  
  }

  update_sprint_backlog_item(prj_id,pb_id,sb_id,sb_item_id,desc,priority,status) : Observable<any[]> {
    const params = { 
      'prj_id': prj_id,
      'pb_id':pb_id,
      'sb_id': sb_id,
      'sb_item_id':sb_item_id,
      'desc':desc,
      'priority':priority,
      'status':status,
    }
    return this.http.post<any>(`api/sprint_backlog_update_item.php`, params);  
  }

  //RTM
  rtm_get_pd_id(query) : Observable<any[]>{
    return this.http.post<any>(`api/rtm_get_pb_id.php`, JSON.stringify(query)); 
  }

  rtm_by_pb(query) : Observable<any[]>{
    return this.http.post<any>(`api/rtm_by_pb.php`, JSON.stringify(query)); 
  }

  rtm_by_sb(query) : Observable<any[]>{
    return this.http.post<any>(`api/rtm_by_sb.php`, JSON.stringify(query)); 
  }

}
