import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  errorMessage: string | null = null;
  constructor(private authSrv:AuthServiceService,private router:Router, private http: HttpClient ) { }

  ngOnInit(): void {
  }

  signUpForm(f:NgForm){
      console.log(f.value);
      this.registerUser(f.value).subscribe(() => {
        this.router.navigate(['login']);
      }, (error) => {
        console.error('Error during registration:', error);
      });
  }

  registerUser(formData: any) {
    const url = 'http://localhost:8080/api/auth/register';
    const body = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      roles: []
    };
    console.log(body);

    return this.http.post(url, body, { responseType: 'text' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          const errorJson = JSON.parse(error.error);
          this.errorMessage = errorJson.message;
        } else {
          this.errorMessage = 'Errore nella chiamata';
        }
        return throwError(this.errorMessage);
      })
    );
  }
}
