import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Project } from './../../shared/project';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExportService } from './../../shared/export.service';

@Component({
  selector: 'app-rtm',
  templateUrl: './rtm.component.html',
  styleUrls: ['./rtm.component.css']
})
export class RtmComponent implements OnInit {

  searchForm: FormGroup;
  userId;
  isPB:Boolean ;
  isSB:Boolean ;
  projectId;
  backlog;
  pb_id;

  displayedColumns: string[] = ['pb_id','pb_desc','pb_priority','pb_status','sb_id','sb_item_id','sb_desc','sb_priority','sb_status'];
  dataSource;

  input;
  private state$: Observable<any>;

  constructor( public fb: FormBuilder, public authService: AuthService, private _snackBar: MatSnackBar,
    private exportService: ExportService,
    private projectService: ProjectService, private actRoute: ActivatedRoute,) 
  {
    //this.userId = this.authService.getToken();
    //let id = this.actRoute.snapshot.paramMap.get('id');
    //console.log(this.actRoute.snapshot.url[1].path == "product-backlog"? true:false);
    this.projectId = this.projectService.getToken();
    this.input = actRoute.snapshot.params;
    this.searchForm = this.fb.group({
      prj_id: [this.projectId],
      keyword: [''],
      backlog: [''],
      priority: [''],
      status: ['']
    })
  }

  ngOnInit(): void { 
  }

  rtm;
  query;
  generate(){
    this.query = this.searchForm.value;
    console.log(this.query)
    if(this.query.backlog === 'Product Backlog'){
      this.projectService.rtm_get_pd_id(this.query).subscribe((pb_id)=> { this.generte_rtm_pb(pb_id) });
    }else{
      this.projectService.rtm_by_sb(this.query).subscribe((rtm)=> { this.dataSource = rtm });
    }
  }

  generte_rtm_pb(item){
    const query = {'prj_id' : this.projectId, 'pb_id' : item }
    this.projectService.rtm_by_pb(query).subscribe((rtm)=> { this.dataSource = rtm });
  }

  onSave():void {
    this.projectService.rtm_create(this.query).subscribe((rtm)=> { this.openSnackBar("Saved","Dismiss") });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  download(){
    this.exportService.downloadFile(this.dataSource,'rtm','rtm');
  }
}
