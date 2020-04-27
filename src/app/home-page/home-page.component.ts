import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isLogIn = false;

  constructor( public authService: AuthService,public router: Router) {

  }

  ngOnInit(): void {
    // location.reload();
    if (this.authService.isLoggedIn) {
      this.isLogIn = true;
    }
  }

}
