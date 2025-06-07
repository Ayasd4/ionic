import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl: string = "https://pfe-backend-ztxi.onrender.com/dashboard";

  constructor(private httpClient: HttpClient) { }

  getTotalVehicule(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/vehicules`);
  }

  getTotalChauffeur(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/chauffeur`);
  }

  getTotalTechnicien(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/technicien`);
  }

  getTotalAtelier(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/atelier`);
  }

}
