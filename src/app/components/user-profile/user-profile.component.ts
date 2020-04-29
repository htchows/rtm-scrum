import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ProjectService } from './../../shared/project.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser;
  id; 
  signupForm: FormGroup;
  email_exists;

  constructor(
    public authService: AuthService, public fb: FormBuilder,
    private projectService: ProjectService, 
    private actRoute: ActivatedRoute,
    public dialog: MatDialog, private router: Router,
    private _snackBar: MatSnackBar
  ) {
    //let id = this.actRoute.snapshot.paramMap.get('id');
    //console.log("profile"+ this.authService.getToken());
    this.id = this.authService.getToken();
    this.authService.getUserProfile(this.id).subscribe(res => {
      this.currentUser = res[0];
      console.log(this.currentUser.username)
      this.signupForm = this.fb.group({
        id: [''],
        username: ['', [Validators.required, Validators.maxLength(20)] ],
        email: [''],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
      })
    })

    
    
  }

  ngOnInit(): void {
  }

  save () : void {
    this.signupForm.controls['id'].setValue(this.currentUser.id);
    this.signupForm.controls['email'].setValue(this.currentUser.email);

    if(this.signupForm.valid){
      this.authService.updateUser(this.signupForm.value).subscribe((res) => {
        if (res === "updated") {
          // this.signupForm.reset();
          this.openSnackBar("Updated", "Dismiss")
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
