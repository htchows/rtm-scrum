import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router, private _snackBar: MatSnackBar
  ) {
    this.signinForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  ngOnInit() { 
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  invalid=false;

  loginUser() {
    if(this.signinForm.valid){
      this.authService.login(this.signinForm.value);
      if(this.authService.isLoggedIn){
        this.invalid = false;
        this.openSnackBar();
      }else{
        this.invalid = true;
      }
    }
    
  }

  loginUser2() {
    if(this.signinForm.valid){
      this.authService.login2(this.signinForm.value).subscribe(r => {
        if(r.length > 0){
          this.invalid = false;
          localStorage.setItem('token', r[0].id);
          this.authService.currentUser = r;
          this.openSnackBar();
          this.router.navigate(['/dashboard']);
        }else{
          this.invalid = true;
        }
        // console.log(r)
        // // this.invalid = false;
        // if(this.authService.isLoggedIn){
        //   this.invalid = false;
        //   this.openSnackBar();
        // }else{
        //   this.invalid = true;
        // }
      });
    }
    
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.signinForm.controls[controlName].hasError(errorName);
  }

  openSnackBar() {
    this._snackBar.open("Welcome back.", "Dismiss", {
      duration: 2000,
    });
  }
}
