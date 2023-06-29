import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',

  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  usuarioDetails: { Id: any; IdPerson: any; ImgPerfil: any }[] | undefined;
  imgPerfil: any;
  userId: string | null = null; // Declaración de la variable userId

  constructor(public auth: AuthService, private router: Router, private elementReF: ElementRef, private usuario: UsersService){
    this.isLoggedIn$ = this.auth.isLoggedIn(); // Obtén el Observable del estado de inicio de sesión
  }

  isLoggedIn(): Observable<boolean> {
    return this.auth.isLoggedIn(); // Llama al método isLoggedIn() del AuthService
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }


  rutas(ruta: string, element: any) {
    const elementNews = this.elementReF.nativeElement.ownerDocument.querySelector(ruta);
    const allElements = element.parentNode.parentNode.childNodes
    allElements.forEach(e => {
      e.children[0].classList.remove("nav-active")
      element.classList.add("nav-active")
    });
    elementNews.scrollIntoView({ behavior: 'smooth' });
  }


  activeSection: string = 'inicio';

  ngOnInit(): void {
    // Obtener el ID del usuario del almacenamiento local
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.obtenerDetailsPerson(this.userId);
    }
  }
  

  obtenerDetailsPerson(userId: string) {
    this.usuario.obtenerDetailsPerson(userId).subscribe(
      (response) => {
        this.usuarioDetails = response.map(({ Id, IdPerson, ImgPerfil }) => ({
          Id: Id,
          IdPerson: IdPerson,
          ImgPerfil : ImgPerfil,

        }));
        this.imgPerfil = this.usuarioDetails[0].ImgPerfil;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
