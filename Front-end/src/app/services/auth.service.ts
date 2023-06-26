import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from './clients.service';

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
    if (this.checkToken()) {
      this.isLogin.next(true);
      this.fetchUserRole().then((role) => {
        if (role === 'admin') {
          this.admin.next(true);
        } else if (role === 'profecional') {
          this.profecional.next(true);
        } else if (role === 'estudiante') {
          this.estudiante.next(true);
        } else if (role === 'empresa') {
          this.empresa.next(true);
        }
      }).catch((error) => {
        console.error('Error al obtener el rol del usuario:', error);
      });
    } else {
      this.isLogin.next(false);
    }
  }

  private fetchUserRole(): Promise<string> {
    const token = localStorage.getItem('token');
    return this.http.post<any>('http://localhost:5000/api/Users/getUserRole', { token })
      .toPromise()
      .then(response => response.role)
      .catch(error => {
        throw error;
      });
  }

  login(credentials: { email: string, Password: string }): Promise<void> {
    return this.clientsService.login(credentials)
      .toPromise()
      .then(response => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.checkLoginStatus();
      })
      .catch(error => {
        throw error;
      });
  }


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
    this.deleteCourrentUser();
    this.isLogin.next(false);
    this.admin.next(false);
    this.profecional.next(false);
    this.estudiante.next(false);
    this.empresa.next(false);
    console.log('Sesion Cerrada');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable().pipe(distinctUntilChanged());
  }

  isAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  }
}
