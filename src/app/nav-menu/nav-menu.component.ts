import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  // isLogin = false;
  constructor(public authService: AuthService,public router: Router) {
    // console.log("hi"+ this.authService.isLoggedIn);
    // this.isLogin = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  logout(){
    //console.log("llgout");
    this.authService.doLogout();
    this.router.navigate(['/']);
  }
}
