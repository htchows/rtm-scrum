import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Project } from './../../shared/project';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ExportService } from './../../shared/export.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  currentId;
  projectId;
  project_detail;
  has_product_backlog:Boolean;
  has_sprint_backlog:Boolean;
  has_rtm:Boolean;
  sprint_backlog_list;
  isShared = false;
  displayedColumns: string[] = ['no', 'keyword', 'backlog', 'priority', 'status','edit'];
  dataSource;

  messages: any[] = [];
  subscription: Subscription;
  
  constructor( public authService: AuthService, 
    private projectService: ProjectService, 
    private exportService: ExportService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog, private router: Router,
    private _snackBar: MatSnackBar) 
  {
    
    //this.currentId = this.authService.getToken();
    this.projectId = this.projectService.getToken();
    this.isShared = this.actRoute.snapshot.url[1].path == "shared-project"? true:false;

    this.projectService.get_project_detail(this.projectId).subscribe(prj => { 
      this.project_detail = prj[0];console.log(this.project_detail)
    });
    
    this.projectService.get_product_backlog(this.projectId)
    .subscribe((pb)=> { if(pb.length > 0) this.has_product_backlog = true;});
    
    this.projectService.get_sprint_backlog_list(this.projectId)
    .subscribe((sb)=> { 
      if(sb.length > 0) {
        this.has_sprint_backlog = true;
        this.sprint_backlog_list = this.get_sprintbacklog(sb);
      }
    });

    this.projectService.rtm_list(this.projectId)
    .subscribe((rtm)=> { 
      if(rtm.length > 0) {
        this.has_rtm = true;
        this.dataSource = rtm;
      }
    });

  }

  ngOnInit(): void {

  }

  sb_list;
  get_sprintbacklog (sb) {
    var uniques;
    uniques = [...new Set(sb.map(data => data.sb_id))];
    this.sb_list = uniques;
    return uniques;
  }

  openSB(sb){
    this.router.navigate(['/project-detail/sprint-backlog',sb]);
  }

  openPB(){
    this.router.navigate(['/project-detail/product-backlog']);
  }

  //DIALOG
  editProject(action,data): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { action:action, data:data, }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar( "Update Success !","Dismiss");
      this.projectService.get_project_detail(this.projectId).subscribe(prj => { 
        this.project_detail = prj[0];
      });
    });
  }

  openDialog(action,backlog,data): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { action:action, backlog:backlog, data:{prj_id:data}, }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar( result  + " Success !","Dismiss");
      this.projectService.get_product_backlog(this.projectId)
        .subscribe((pb)=> { 
          if(pb.length > 0) this.has_product_backlog = true;
        });
    
      this.projectService.get_sprint_backlog_list(this.projectId)
        .subscribe((sb)=> { 
          if(sb.length > 0) {
            this.has_sprint_backlog = true;
            this.sprint_backlog_list = this.get_sprintbacklog(sb);
          }
        });
      
      this.projectService.rtm_list(this.projectId)
      .subscribe((rtm)=> { 
        if(rtm.length > 0) {
          this.has_rtm = true;
          this.dataSource = rtm;
        }
      });
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //EXPORT
  download(){
    //pb
    this.projectService.get_product_backlog(this.projectId).subscribe(r => {
      this.exportService.downloadFile(r, 'pb','product-backlog');
    });
    //sb
    for (let i = 0; i < this.sb_list.length; i++) {
      var source = this.sb_list[i];
      this.projectService.get_sprint_backlog_detail(this.projectId,source).subscribe(sb => {
        this.exportService.downloadFile(sb,'sb',source);
      } );
    }
    //rtm
    
  }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(): void {
    this.projectService.get_product_backlog(this.projectId).subscribe(r => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(r);
      const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['pb'] };
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      this.saveExcelFile(excelBuffer, 'pb');
    });
  
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

}
