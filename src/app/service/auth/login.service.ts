import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { User } from '../../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoginRequest } from '../../models/LoginRequest';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem('token')!== null)
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem('token') || '')
  }

  login(credentials: LoginRequest): Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem('token', userData.token)
        this.currentUserData.next(userData.token)
        this.currentUserLoginOn.next(true)
      }),
      catchError(this.handleError)
    )
  }

  logout():void{
    sessionStorage.removeItem('token')
    this.currentUserLoginOn.next(false)
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('Se ha producido un error. ', error.error)
    }else{
      console.error('backend retornó el código de estado', error.status, error.error)
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'))
  }

  get userData():Observable<string>{
    return this.currentUserData.asObservable()
  }

  get userLogin():Observable<boolean>{
    return this.currentUserLoginOn.asObservable()
  }
}
