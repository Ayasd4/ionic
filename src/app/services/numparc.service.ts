import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumparcService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "https://pfe-backend-ztxi.onrender.com";

  fetchAllNumparc(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAllNumparc`);
  }

  fetchAllName(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAllName`);
  }
}
