import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Project } from './../../shared/project';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.css']
})
export class ProductBacklogComponent implements OnInit {

  currentId;
  projectId;
  backlog;

  constructor( public authService: AuthService, private projectService: ProjectService, private actRoute: ActivatedRoute) 
  {
    //this.currentId = this.authService.getToken();
    this.projectId = actRoute.snapshot.params.id;
    
    this.projectService.get_product_backlog(this.projectId)
    .subscribe((pb)=> { this.backlog = pb; });

  }

  ngOnInit(): void {
  }

  
}
