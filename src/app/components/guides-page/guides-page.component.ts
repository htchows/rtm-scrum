import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guides-page',
  templateUrl: './guides-page.component.html',
  styleUrls: ['./guides-page.component.css']
})
export class GuidesPageComponent implements OnInit {

  panelOpenState = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
