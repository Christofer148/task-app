import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/auth/login.service';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../models/LoginRequest';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [FormBuilder, LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginError:string = ''
  loginForm!: FormGroup
  constructor(
    private formBuilder:FormBuilder, 
    private router:Router, 
    private loginService: LoginService
  ){}
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }
  get username(){
    return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password')
  }
  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          sessionStorage.setItem('token', userData.token)
          this.loginService.currentUserData.next(userData.token)
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        }
      })

    }else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

}
