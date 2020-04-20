import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Backlog } from './../../shared/backlog';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {MatSnackBar} from '@angular/material/snack-bar';

import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-backlogs',
  templateUrl: './backlogs.component.html',
  styleUrls: ['./backlogs.component.css']
})
export class BacklogsComponent implements OnInit {

  userId;
  isPB:Boolean ;
  isSB:Boolean ;
  projectId; sbId;
  backlog;
  isShared = false;
  isEdit = false;

  data = {};

  displayedColumns: string[];
  // columnsPB: string[] = ['No', 'PB ID', 'Description', 'Priority', 'Status'];
  // columnsSB: string[] = ['No', 'PB ID', 'SB ID', 'SB Item ID', 'Description', 'Priority', 'Status'];

  itemForm: FormGroup;

  dataSource: MatTableDataSource<Backlog>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor( public fb: FormBuilder,
    public authService: AuthService, 
    private projectService: ProjectService, 
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) 
  {
    this.projectId = this.projectService.getToken();
    this.sbId = actRoute.snapshot.params.sb_id;
    this.isShared = this.projectService.getShareToken() == "true"? true:false;
   
    this.data = { prj_id : this.projectId, sb_id : this.sbId }
    
    if(this.actRoute.snapshot.url[1].path == "product-backlog"){
      this.projectService.get_product_backlog(this.projectId)
      .subscribe((pb)=> { 
        this.backlog = pb; this.isPB = true;  this.isSB = false; 
        this.dataSource = new MatTableDataSource(pb);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns= ['no', 'pb_id', 'desc', 'priority', 'status','edit'];
      });
    }else{
      console.log(this.projectId,this.sbId)
      this.projectService.get_sprint_backlog_detail(this.projectId,this.sbId)
      .subscribe((pb)=> { 
        // console.log(pb)
        this.backlog = pb; this.isPB = false; this.isSB = true; 
        this.dataSource = new MatTableDataSource(pb);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns= ['no', 'pb_id', 'sb_id', 'sb_item_id','desc', 'priority', 'status','edit'];
      });
    }

  }

  ngOnInit(): void { 

  }

  editMode():void {
    if(this.isEdit){
      this.displayedColumns.push('edit');
    }else{
      this.displayedColumns.pop();
    }
  }

  selectedRowIndex;
  selectedRow(element):void{
    //console.log(element)
    this.selectedRowIndex = element.sb_item_id;
  }

  submit(){
    console.log(this.itemForm.value);
  }

  //DIALOG
  openDialog(action,data): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { backlog: this.isPB? 'pb' : 'sb', action:action, data:data, }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar("Updated","Dismiss");
      if(this.isPB){
        this.projectService.get_product_backlog(this.projectId)
          .subscribe((pb)=> { this.dataSource = new MatTableDataSource(pb)});
      }else{
        this.projectService.get_sprint_backlog_detail(this.projectId,this.sbId)
          .subscribe((pb)=> { this.dataSource = new MatTableDataSource(pb) });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
