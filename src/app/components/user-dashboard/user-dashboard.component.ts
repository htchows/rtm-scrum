import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

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

  displayedColumns1: string[] = ['project_id', 'title', 'desc','status','edit'];
  displayedColumns2: string[] = ['project_id', 'username', 'title', 'desc','status'];

  dataSource;
  dataSource2;

  constructor( public authService: AuthService, 
    private projectService: ProjectService, 
    private actRoute: ActivatedRoute,
    public dialog: MatDialog, private router: Router,
    private _snackBar: MatSnackBar
  ) {
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe(res => {
    //   this.currentUser = res.msg;
    // })
    this.currentId = this.authService.getToken();

    this.projectService.get_project_own(this.currentId).subscribe(prj => {
      this.project_own_list = prj;
      this.dataSource = prj; 
    } );

    this.projectService.get_project_view(this.currentId).subscribe(prj => {
      this.project_view_list = prj;
      this.dataSource2 = prj; 
    } );
  }

  redirec(id){
    this.projectService.setToken(id);
    this.projectService.setShareToken(false);
    this.router.navigate(['/dashboard/project-detail']);
  }

  redirectShare(id){
    this.projectService.setToken(id);
    this.projectService.setShareToken(true);
    this.router.navigate(['/dashboard/project-detail']);
  }

  ngOnInit(): void {
  }

  //DIALOG
  openDialog(action,data): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { action:action, data:data, }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar( result  + " Success !","Dismiss");
      this.projectService
        .get_project_own(this.currentId)
        .subscribe(prj => {
          this.project_own_list = prj;
          this.dataSource = prj; 
        } );

    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
