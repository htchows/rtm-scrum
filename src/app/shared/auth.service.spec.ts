import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        AuthService, RouterTestingModule, HttpClientTestingModule
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be registered', () => {
    // expect(service).toBeTruthy();
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
    var r;
    service.register(user[0]).subscribe(result => {
        // expect(result.length).toBe("registered");
        r = result;
        //expect(result).toEqual("registered");
    });
    //const request = httpMock.expectOne( `api/register`);
    //expect(request.request.method).toBe('POST');
    //.flush(user);
    expect(r).toEqual("registered");

  });

});
