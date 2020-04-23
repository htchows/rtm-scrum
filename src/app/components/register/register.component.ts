import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  email_exists = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router, private _snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)] ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(10)]]
    })
  }

  ngOnInit() { }

  registerUser() {
    if(this.signupForm.valid){
      this.authService.check_email(this.signupForm.value.email).subscribe((res) => {
        if (res === "0") {
          this.email_exists = false;
          this.authService.register(this.signupForm.value).subscribe((res) => {
            if (res === "registered") {
              this.signupForm.reset();
              this.openSnackBar("Register successful !", "Dismiss")
              this.router.navigate(['/login']);
            }
          })
        }else{
          this.email_exists = true;
          console.log(this.email_exists)
        } 
      })
    }
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
