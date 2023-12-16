import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { RegisterRequest } from '../../models/RegisterRequest';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(credentials: RegisterRequest){
    return this.http.post<any>(environment.urlHost+"auth/register", credentials).pipe(
      tap((userData) => {

        sessionStorage.setItem('token', userData.token)
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('Se ha producido un error. ', error.error)
    }else{
      console.error('backend retornó el código de estado', error.status, error.error)
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'))
  }
}
