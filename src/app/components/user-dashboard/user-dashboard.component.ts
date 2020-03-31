import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  currentUser: Object = {};
  currentId;
  project_own_list;
  project_view_list;

  displayedColumns: string[] = ['project_id', 'project_title', 'project_desc','project_status'];
  dataSource;
  dataSource2;

  constructor( public authService: AuthService, private projectService: ProjectService, private actRoute: ActivatedRoute) {
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe(res => {
    //   this.currentUser = res.msg;
    // })
    this.currentId = this.authService.getToken();

    this.projectService
        .get_project_own(this.currentId)
        .subscribe(prj => {
          this.project_own_list = prj;
          this.dataSource = prj; 
        } );

    this.projectService
        .get_project_view(this.currentId)
        .subscribe(prj => {
          this.project_view_list = prj;
          this.dataSource2 = prj; 
          } );
  }

  ngOnInit(): void {
  }

}
