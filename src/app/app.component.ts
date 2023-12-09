import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Content } from './models/responseApi';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskComponent, HttpClientModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  data: Content[] = []

  constructor(private dataService: ApiService){}

  

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => this.data = data.content);
  }
  
}
