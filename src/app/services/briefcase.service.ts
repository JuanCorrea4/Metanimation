import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BriefcaseService {
//private apiUrl = 'https://metanimation-back.onrender.com/Api'; 
private apiUrl = 'http://localhost:5000/api'; // URL base de la API

  constructor(private http: HttpClient) {}

  obtenerPortafolios(idCategoria: string): Observable<any[]> {
    const url = `${this.apiUrl}/course/?categoria=${idCategoria}`;
    return this.http.get<any[]>(url);
  }
  obtenerAllPortafolios(): Observable<any[]> {
    const url = `${this.apiUrl}/project`;
    return this.http.get<any[]>(url);
  }
  obtenerProfesor(idProfesor: string): Observable<any[]> {
    const url = `${this.apiUrl}/teacher/${idProfesor}`;
    return this.http.get<any[]>(url);
  }
  obtenerAllArtist(): Observable<any[]> {
    const url = `${this.apiUrl}/project/artist`;
    return this.http.get<any[]>(url);
  }
  obtenerProyecto(projectId: string): Observable<any[]> {
    const url = `${this.apiUrl}/project/${projectId}`;
    return this.http.get<any[]>(url);
  }

  insertProjectUsers(id: string, userProject: any, token: string) {
    console.log('Datos enviados al servidor:', userProject);
    const url = `${this.apiUrl}/project/Insertproject/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.http.post(url, userProject, { headers })
      .toPromise()
      .then(response => {
        console.log('Detalles del usuario modificados con éxito:', response);
        return response;
      })
      .catch(error => {
        console.error('Error al modificar los detalles del usuario:', error);
        throw error;
      });
  }
  insertRecourse(projectId: string, resouceProject: any , token:string) {
    const url = `${this.apiUrl}/project/Insertrecurso/${projectId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(url, resouceProject, { headers })
      .toPromise()
      .then(response => {
        console.log('Recursos insertados correctamente:', response);
        return response;
      })
      .catch(error => {
        console.error('Error al insertar los recursos:', error);
        throw error;
      });
  }
  
  
}
