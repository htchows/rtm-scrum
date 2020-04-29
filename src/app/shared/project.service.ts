import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError, Subject } from 'rxjs';
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

  private subject = new Subject<any>();

  setToken(token){
    localStorage.setItem('prj', token);
  }

  getToken() {
    return localStorage.getItem('prj');
  }

  setShareToken(token){
    localStorage.setItem('share', token);
  }

  getShareToken() {
    return localStorage.getItem('share');
  }

  setSBToken(token){
    localStorage.setItem('sb', token);
  }

  getSBToken() {
    return localStorage.getItem('sb');
  }


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

  add_project(params) : Observable<any[]> {
    return this.http.post<any>(`api/project_create.php`, params);  
  }

  update_project(params) : Observable<any[]> {
    return this.http.put<any>(`api/project_update.php`, params);  
  }

  delete_project(prj_id) : Observable<any[]> {
    return this.http.post<any>(`api/project_delete.php`, JSON.stringify(prj_id));  
  }

  share_get_id(params) : Observable<any[]> {
    return this.http.post<any>(`api/project_viewer_get_id.php`, params);  
  }

  share_add(params) : Observable<any[]> {
    return this.http.post<any>(`api/project_viewer_add.php`, params);  
  }

  share_clear(params) : Observable<any[]> {
    return this.http.post<any>(`api/project_viewer_clear.php`, params);  
  }

  //PRODUCT BACKLOG
  get_product_backlog(prj_id) : Observable<any[]> {
    return this.http.post<any>(`api/product_backlog_list.php`, JSON.stringify(prj_id));  
  }

  create_product_backlog_item(params) : Observable<any[]> {
    return this.http.post<any>(`api/product_backlog_create_item.php`, params);  
  }

  update_product_backlog_item(params) : Observable<any[]> {
    return this.http.put<any>(`api/product_backlog_update_item.php`, params);  
  }

  delete_product_backlog_item(params) : Observable<any[]> {
    return this.http.post<any>(`api/product_backlog_delete_item.php`, params);  
  }

  check_pb_id (params) : Observable<any> {
    return this.http.post<any>(`api/product_backlog_id.php`, params);  
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

  create_sprint_backlog_item(params) : Observable<any[]> {
    return this.http.post<any>(`api/sprint_backlog_add_item.php`, params);  
  }

  update_sprint_backlog_item(params) : Observable<any[]> {
    return this.http.put<any>(`api/sprint_backlog_update_item.php`, params);  
  }

  delete_sprint_backlog_item(params) : Observable<any[]> {
    return this.http.post<any>(`api/sprint_backlog_delete_item.php`, params);  
  }

  check_sb_id (params) : Observable<any> {
    return this.http.post<any>(`api/sprint_backlog_id.php`, params);  
  }


  //RTM
  rtm_list(prj_id) : Observable<any[]>{
    return this.http.post<any>(`api/rtm_list.php`, JSON.stringify(prj_id)); 
  }

  rtm_get_pd_id(query) : Observable<any[]>{
    return this.http.post<any>(`api/rtm_get_pb_id.php`, JSON.stringify(query)); 
  }

  rtm_by_pb(query) : Observable<any[]>{
    return this.http.post<any>(`api/rtm_by_pb.php`, JSON.stringify(query)); 
  }

  rtm_by_sb(query) : Observable<any[]>{
    return this.http.post<any>(`api/rtm_by_sb.php`, JSON.stringify(query)); 
  }

  rtm_create(params) : Observable<any[]> {
    return this.http.post<any>(`api/rtm_create.php`, params);  
  }

  rtm_delete(params) : Observable<any[]> {
    console.log(params)
    return this.http.post<any>(`api/rtm_delete.php`,  JSON.stringify(params));  
  }

}
