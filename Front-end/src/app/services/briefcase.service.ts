import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BriefcaseService {

  private apiUrl = 'http://localhost:5000/api'; // URL base de la API

  constructor(private http: HttpClient) {}

  obtenerPortafolios(idCategoria: string): Observable<any[]> {
    const url = `${this.apiUrl}/course/?categoria=${idCategoria}`;
    return this.http.get<any[]>(url);
  }
  obtenerAllPortafolios(): Observable<any[]> {
    const url = `${this.apiUrl}/course`;
    return this.http.get<any[]>(url);
  }
  obtenerProfesor(idProfesor: string): Observable<any[]> {
    const url = `${this.apiUrl}/teacher/${idProfesor}`;
    return this.http.get<any[]>(url);
  }
}
