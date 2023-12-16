import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../service/register/register.service';
import { RegisterRequest } from '../../models/RegisterRequest';
import { LoginService } from '../../service/auth/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [FormBuilder, RegisterService, LoginService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerError:string = ''
  registerForm!: FormGroup
  constructor(
    private formBuilder:FormBuilder, 
    private router:Router, 
    private registerService: RegisterService,
    private loginService: LoginService
  ){}
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    })
  }
  get username(){
    return this.registerForm.get('username')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get firstName(){
    return this.registerForm.get('firstName')
  }
  get lastName(){
    return this.registerForm.get('lastName')
  }
  get country(){
    return this.registerForm.get('coutry')
  }

  register(){
    if(this.registerForm.valid){
      this.registerError = ''
      this.registerService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: (userData) => {
          console.log(userData.token)
          sessionStorage.setItem('token', userData.token)
          this.loginService.currentUserData.next(userData.token)
          this.loginService.currentUserLoginOn.next(true)
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerError=errorData;
        },
        complete: () => {
          console.info("User created successfully");
          this.router.navigateByUrl('/home');
          this.registerForm.reset();
        }
      })

    }else{
      this.registerForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }
}
