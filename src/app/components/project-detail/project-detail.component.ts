import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Project } from './../../shared/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  currentId;
  projectId;
  project_detail:Project;
  has_product_backlog:Boolean;
  has_sprint_backlog:Boolean;
  sprint_backlog_list;

  constructor( public authService: AuthService, private projectService: ProjectService, private actRoute: ActivatedRoute) 
  {
    //this.currentId = this.authService.getToken();
    this.projectId = actRoute.snapshot.params.id;

    this.projectService.get_project_detail(this.projectId)
    .subscribe(prj => { this.project_detail = prj[0]} );
    
    this.projectService.get_product_backlog(this.projectId)
    .subscribe((pb)=> { 
      // console.log(pb);
      if(pb.length > 0) this.has_product_backlog = true;
    });
    
    this.projectService.get_sprint_backlog_list(this.projectId)
    .subscribe((sb)=> { 
      if(sb.length > 0) {
        this.has_sprint_backlog = true;
        this.sprint_backlog_list = this.get_sprintbacklog(sb);
      }
    });

  }

  ngOnInit(): void {

  }

  get_sprintbacklog (sb) {
    var uniques;
    uniques = [...new Set(sb.map(data => data.sb_id))];
    return uniques;
  }

}
