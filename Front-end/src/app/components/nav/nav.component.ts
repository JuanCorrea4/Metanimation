import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',

  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private elementReF: ElementRef){
  }

  isLoggedIn(): Observable<boolean>{
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout()
    console.log('Sesion Cerrada')
    this.router.navigate(['/home']);
  }



  rutas(ruta: string) {
    const elementNews = this.elementReF.nativeElement.ownerDocument.querySelector(ruta);
    console.log(elementNews);
    elementNews.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {
    
  }
}
