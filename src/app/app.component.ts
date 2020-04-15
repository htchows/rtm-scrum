import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rtm-for-scrum';
  prj = false;

  projectId;

  constructor( private actRoute: ActivatedRoute) 
  {
    //this.userId = this.authService.getToken();
    //let id = this.actRoute.snapshot.paramMap.get('id');
    //console.log(this.actRoute.snapshot.url[1].path == "product-backlog"? true:false);
    // this.projectId = actRoute.snapshot.params.id;
    // this.prj = this.actRoute.snapshot.url[1].path == "project-detail"? true:false;
  }
}
