import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Project } from './../../shared/project';
import { FormBuilder, FormGroup } from "@angular/forms";

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

  constructor( public fb: FormBuilder, public authService: AuthService, 
    private projectService: ProjectService, private actRoute: ActivatedRoute) 
  {
    //this.userId = this.authService.getToken();
    //let id = this.actRoute.snapshot.paramMap.get('id');
    //console.log(this.actRoute.snapshot.url[1].path == "product-backlog"? true:false);
    this.projectId = actRoute.snapshot.params.id;
    
    this.searchForm = this.fb.group({
      prj_id: [this.projectId],
      backlog: [''],
      keyword: [''],
      priority: [''],
      status: ['']
    })
  }

  ngOnInit(): void { }

  rtm;
  
  generate(){
    const query = this.searchForm.value;
    if(query.backlog === 'pb'){
      this.projectService.rtm_get_pd_id(query)
      .subscribe((pb_id)=> { this.generte_rtm_pb(pb_id) });
    }else{
      this.projectService.rtm_by_sb(query).subscribe((rtm)=> { this.rtm = rtm });
    }
  }

  generte_rtm_pb(item){
    const query = {'prj_id' : this.projectId, 'pb_id' : item }
    this.projectService.rtm_by_pb(query).subscribe((rtm)=> { this.rtm = rtm });
  }
}
