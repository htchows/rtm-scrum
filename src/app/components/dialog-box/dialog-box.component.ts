import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ProjectService } from './../../shared/project.service';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  isPrj_create:boolean = false;
  isPrj_update:boolean = false;
  isPrj_delete:boolean = false;
  isPB:boolean = false;

  isPB_create:boolean = false;
  isPB_update:boolean = false;
  isPB_delete:boolean = false;

  isSB:boolean = false;
  isSB_create:boolean = false;
  isSB_add:boolean = false;
  isSB_update:boolean = false;
  isSB_delete:boolean = false;

  isRTM_delete:boolean = false;

  priorities = [
    {value: 'High', viewValue: 'High'},
    {value: 'Medium', viewValue: 'Medium'},
    {value: 'Low', viewValue: 'Low'}
  ];

  itemForm: FormGroup;
  item;
  prj_id;
  pb_list;

  constructor(
    public fb: FormBuilder,
    private projectService: ProjectService, 
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data) 
  { 
    if(data.action === 'Create Project' || data.action === 'Update Project'){
      this.isPrj_create = data.action === 'Create Project'? true:false;
      this.isPrj_update = data.action === 'Update Project'? true:false;
      this.itemForm = this.fb.group({
        pid: [''],
        prj_id: [''],
        user_id: [''],
        title: [''],
        desc: [''],
        status: [''],
        share:[""],
        action:['']
      })
      console.log(this.data.data)
    }else if(data.action === 'Delete Project'){
      this.isPrj_delete = true;

    }else if(data.backlog === 'pb' || data.backlog === 'sb'){
      this.prj_id = data.data.prj_id;
      this.isPB = data.backlog === 'pb' ? true : false;
      this.isSB = data.backlog === 'sb' ? true : false;

      this.isPB_create = data.action === 'Create PB Item'? true:false;
      this.isSB_create = data.action === 'Create SB Item'? true:false;
      this.isSB_add = data.action === 'Add SB Item'? true:false;

      this.isPB_update = data.action === 'Update PB Item'? true:false;
      this.isSB_update = data.action === 'Update SB Item'? true:false;

      this.isPB_delete = data.action === 'Delete PB Item'? true:false;
      this.isSB_delete = data.action === 'Delete SB Item'? true:false;

      this.projectService.get_product_backlog(this.prj_id).subscribe((pb)=> { console.log(pb);this.pb_list = pb; });

      this.item = data.data;
      this.itemForm = this.fb.group({
        prj_id: [''],
        pbid: [''],
        sbid:[''],
        pb_id: [''],
        sb_id: [''],
        sb_item_id: [''],
        desc: [''],
        priority: [''],
        status: [''],
        action:['']
      })
    }else if(data.action === "Delete RTM"){
      this.isRTM_delete = true;
    }
   
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //PROJECT
  prj_create():void {
    this.itemForm.controls['user_id'].setValue(this.data.data);
    var email = this.itemForm.value.share.split(',');
    var param = {prj_id:this.itemForm.value.pid, email:email}

    this.projectService.add_project(this.itemForm.value).subscribe(() => { 
      this.projectService.share_get_id(param).subscribe((r) => { 
        param =  {prj_id:this.itemForm.value.pid, email:r}
        this.projectService.share_clear(param.prj_id).subscribe(() => { 
          this.projectService.share_add(param).subscribe(() => { 
            this.dialogRef.close(); 
          });
        });
      });
    });
  }

  prj_update():void {
    this.itemForm.controls['user_id'].setValue(this.data.data.user_id);
    this.itemForm.controls['pid'].setValue(this.data.data.pid);
    var email = this.itemForm.value.share.split(',');
    var param = {prj_id:this.itemForm.value.pid, email:email}

    this.projectService.update_project(this.itemForm.value).subscribe(() => { 
      this.projectService.share_get_id(param).subscribe((r) => { 
        param =  {prj_id:this.itemForm.value.pid, email:r}
        this.projectService.share_clear(param.prj_id).subscribe(() => { 
          this.projectService.share_add(param).subscribe(() => { 
            this.dialogRef.close(); 
          });
        });
      });
     });
  }

  prj_delete():void {
    this.projectService.delete_project(this.data.data.pid).subscribe(() => { this.dialogRef.close(); });
  }

  //PRODUCT BACKLOG
  pb_id_exists = false;
  pb_create():void {
    this.itemForm.controls['prj_id'].setValue(this.prj_id);
    this.itemForm.controls['action'].setValue('create');
    this.projectService.check_pb_id(this.itemForm.value).subscribe((r) => { 
      if(r==="0"){
        this.pb_id_exists = false;
        this.projectService.create_product_backlog_item(this.itemForm.value).subscribe(() => { 
          this.dialogRef.close(); 
        });
      }else{
        this.pb_id_exists = true;
      }
    });
    
  }

  pb_update():void {
    this.itemForm.controls['prj_id'].setValue(this.prj_id);
    this.itemForm.controls['pbid'].setValue(this.data.data.pbid);
    this.itemForm.controls['action'].setValue('update');
    this.projectService.check_pb_id(this.itemForm.value).subscribe((r) => { 
      if(r==="0"){
        this.pb_id_exists = false;
        this.projectService.update_product_backlog_item(this.itemForm.value).subscribe(() => { 
          this.dialogRef.close(); 
        });
      }else{
        this.pb_id_exists = true;
      }
    });
  }

  pb_delete():void {
    this.projectService.delete_product_backlog_item(this.data.data)
    .subscribe(() => { 
      this.dialogRef.close(); 
    });
  }

  //SPRINT BACKLOG
  sb_create():void {
    this.itemForm.controls['prj_id'].setValue(this.prj_id);
    this.projectService.create_sprint_backlog_item(this.itemForm.value)
    .subscribe(() => { 
      this.dialogRef.close(); 
    });
  }
  
  sb_add():void {
    this.itemForm.controls['prj_id'].setValue(this.prj_id);
    this.itemForm.controls['sb_id'].setValue(this.data.data.sb_id);
    this.projectService.create_sprint_backlog_item(this.itemForm.value)
    .subscribe(() => { 
      this.dialogRef.close(); 
    });
  }

  sb_update():void {
    this.itemForm.controls['prj_id'].setValue(this.prj_id);
    this.itemForm.controls['sbid'].setValue(this.data.data.sbid);
    console.log(this.itemForm.value)
    this.projectService.update_sprint_backlog_item(this.itemForm.value)
    .subscribe(() => { 
      this.dialogRef.close(); 
    });   
  }

  sb_delete():void {
    this.projectService.delete_sprint_backlog_item(this.data.data)
    .subscribe(() => { 
      this.dialogRef.close(); 
    });
  }
  
  //RTM
  rtm_delete():void {
    this.projectService.rtm_delete(this.data.data.prj_id)
      .subscribe(() => { 
        this.dialogRef.close(); 
      });
  }
  
}
