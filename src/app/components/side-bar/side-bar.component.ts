import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  panelOpenState = false;
  projectId;
  constructor(private actRoute: ActivatedRoute,) {
    this.projectId = actRoute.snapshot.params.id;
   }

  ngOnInit(): void {
  }

}
