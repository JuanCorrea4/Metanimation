import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  obtenerDetalles(idCurso: string) {
    throw new Error('Method not implemented.');
  }
 // private apiUrl = 'https://metanimation-back.onrender.com/Api'; 
   private apiUrl = 'http://localhost:5000/api'; // URL base de la API

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<any[]> {
    const url = `${this.apiUrl}/category`;
    return this.http.get<any[]>(url);
  }

  obtenerCursos(idCategoria: string): Observable<any[]> {
    const url = `${this.apiUrl}/course/?categoria=${idCategoria}`;
    return this.http.get<any[]>(url);
  }
  obtenerAllCursos(): Observable<any[]> {
    const url = `${this.apiUrl}/course`;
    return this.http.get<any[]>(url);
  }
  obtenerProfesor(idTeacher: string): Observable<any[]> {
    const url = `${this.apiUrl}/teacher/${idTeacher}`;
    return this.http.get<any[]>(url);
  }

  obtenerDetailsCurso(idCurso: string): Observable<any[]> {
    const url = `${this.apiUrl}/ContentCourse/details/${idCurso}`;
    return this.http.get<any[]>(url);
  }
  obtenerContentCurso(idCurso: string): Observable<any[]> {
    const url = `${this.apiUrl}/ContentCourse/content/${idCurso}`;
    return this.http.get<any[]>(url);
  }
  obtenerFilesCurso(idCurso: string): Observable<any[]> {
    const url = `${this.apiUrl}/ContentCourse/Files/${idCurso}`;
    return this.http.get<any[]>(url);
  }
  obtenerLinksCurso(idCurso: string): Observable<any[]> {
    const url = `${this.apiUrl}/ContentCourse/Links/${idCurso}`;
    return this.http.get<any[]>(url);
  }
  obtenerComentsCurso(idCurso: string): Observable<any[]> {
    const url = `${this.apiUrl}/ContentCourse/Coments/${idCurso}`;
    return this.http.get<any[]>(url);
  }
}