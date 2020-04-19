import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RegisterComponent,HttpClientTestingModule, RouterTestingModule,FormBuilder],
      providers: [HttpClientTestingModule, RouterTestingModule,FormBuilder],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance; 
    element = fixture.nativeElement; 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should register', () => {
    const user = [
    {
      username: 'claire',
      email: "claire@mail.com",
      password: 'claire'
    }, 
    {
      username: 'phil',
      email: "phil@mail.com",
      password: 'phil'
    }];
    component.signupForm.controls['username'].setValue(user[0].username);
    component.signupForm.controls['email'].setValue(user[0].email);
    component.signupForm.controls['password'].setValue(user[0].password);
    component.registerUser();
    expect(component.email_exists).toBeFalse();
  });
});
