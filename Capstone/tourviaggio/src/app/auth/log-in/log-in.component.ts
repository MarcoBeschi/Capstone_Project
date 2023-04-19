import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private authSrv: AuthServiceService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  loginForm(f: NgForm) {
    this.authSrv.logIn(f.value).subscribe(() => {
      this.router.navigate(['/homepage']);
    }, (error) => {
      console.error('Error during login:', error);
    });
  }

  loginUser(formData: any) {
    const url = 'http://localhost:8080/api/auth/login';
    const body = {
      username: formData.username,
      password: formData.password
    };
    console.log(body);

    return this.http.post(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          const errorJson = JSON.parse(error.error);
          if (errorJson.message === "Utente non esiste" || errorJson.message === "Username o password sbagliata") {
            this.errorMessage = errorJson.message;
          } else {
            this.errorMessage = 'Username o password sbagliata';
          }
        } else {
          this.errorMessage = 'Username o password sbagliata';
        }
        return throwError(this.errorMessage);
      })
    );
  }
}
