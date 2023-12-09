import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../models/responseApi';
import { responseApi } from '../models/responseApi';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi:string = 'http://localhost:8080/api/tasks/'

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get<responseApi>(this.urlApi);
  }
}
