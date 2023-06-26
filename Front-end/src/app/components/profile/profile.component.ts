import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  /*variables*/
  cantProjects: number = 0 
  likes:number = 0
  followers:number = 0 // Seguidores
  followed: number = 0 // seguidos
  nameUsers:string= 'Antonio J prueba'
  description:string = ''
  city:string=''

    /*MANEJO BOTON FAVORITOS*/
    counters= [0,0,0,0,0,0,0,0,0,0,0,0];
    favoriteCount = 0;
  
    toggleFavorite(index: number) {
      if (this.counters[index] === 0) {
        this.counters[index]++;
        this.favoriteCount++;
      } else {
        this.counters[index]--;
        this.favoriteCount--;
      }
    
  }
  mostrarComponente = [false, false, false];

  toggleComponent(index: number): void {
    this.mostrarComponente[index] = !this.mostrarComponente[index];
  }
  
  
  
  ngOnInit(): void {
  }

}
