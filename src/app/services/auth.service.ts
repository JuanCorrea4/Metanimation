import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from './clients.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated(): boolean {
    return this.checkToken();
  }
  
  isLogin = new BehaviorSubject<boolean>(this.checkToken());
  admin = new BehaviorSubject<boolean>(false);
  profecional = new BehaviorSubject<boolean>(false);
  estudiante = new BehaviorSubject<boolean>(false);
  empresa = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private clientsService: ClientsService) {
    this.checkLoginStatus();
  }

  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private checkLoginStatus(): void {
    const isLoggedIn = this.checkToken();
    this.isLogin.next(isLoggedIn);
    
    if (isLoggedIn) {
      this.fetchUserRole()
        .then(role => {
          this.admin.next(role === 'admin');
          this.profecional.next(role === 'profecional');
          this.estudiante.next(role === 'estudiante');
          this.empresa.next(role === 'empresa');
        })
        .catch(error => {
          console.error('Error al obtener el rol del usuario:', error);
        });
    } else {
      this.admin.next(false);
      this.profecional.next(false);
      this.estudiante.next(false);
      this.empresa.next(false);
    }
  }
  

  private fetchUserRole(): Promise<string> {
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject('No se encontró ningún token');
    }

    // http://localhost:5000/api/Users/getUserRole
    return this.http.post<any>('https://metanimation-back.onrender.com/Api/Users/getUserRole', { token })
      .toPromise()
      .then(response => response.role)
      .catch(error => {
        console.error('Error al obtener el rol del usuario:', error);
        throw error;
      });
  }
  
  login(credentials: { email: string, Password: string }): Promise<{ token: string, id: number }> {
    return this.clientsService.login(credentials)
      .toPromise()
      .then(response => {
        console.log(response);
        const token = response?.Token;
        const id = response?.Id?.[0]?.Id;
        if (!token || !id) {
          throw new Error('La respuesta de inicio de sesión es inválida');
        }
        return { token, id }; // Devuelve el token y el ID del usuario en la respuesta
      })
      .catch(error => {
        throw error;
      });
  }
  
  // Agrega la segunda parte aquí

  setCourrentUser(user: string): void {
    localStorage.setItem('courrentUser', user);
  }

  getCourrentUser(): string | null {
    return localStorage.getItem('courrentUser');
  }

  private deleteCourrentUser(): void {
    localStorage.removeItem('courrentUser');
  }

  getToken(): string | null {
    if (this.checkToken()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Eliminar el ID del usuario
    this.deleteCourrentUser();
    this.isLogin.next(false);
    this.admin.next(false);
    this.profecional.next(false);
    this.estudiante.next(false);
    this.empresa.next(false);
    console.log('Sesión cerrada');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable().pipe(distinctUntilChanged());
  }

  isAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  }
  
  getUserId(userId: string): Observable<string | null> {
    if (userId) { // http://localhost:5000/api
      const url = `https://metanimation-back.onrender.com/Api/Users/${userId}`; // Modificar la URL para incluir el parámetro de ID
      return this.http.get<any>(url)
        .pipe(
          map(response => response.userId),
          catchError(error => {
            console.error('Error al obtener el ID del usuario:', error);
            return of(null);
          })
        );
    } else {
      return of(null);
    }
  }
  
}
