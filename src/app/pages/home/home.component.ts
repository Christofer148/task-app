import { Component, OnInit } from '@angular/core';
import { TaskComponent } from '../../components/task/task.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { Content } from '../../models/responseApi';
import { LoginService } from '../../service/auth/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskComponent, HttpClientModule, RouterModule],
  providers: [ApiService, LoginService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  data: Content[] = []

  constructor(
    private dataService: ApiService,
    private loginService: LoginService,
    private router: Router
    ){}

  ngOnInit(): void {
    if(this.loginService.currentUserLoginOn){
      console.log(sessionStorage.getItem('token'))
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
      this.dataService.getData(headers).subscribe(data => this.data = data.content);
    }else{
      this.router.navigateByUrl('/login');
    }
  }
}
