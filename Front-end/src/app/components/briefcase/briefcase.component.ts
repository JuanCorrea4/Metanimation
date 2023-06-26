import { Component, OnInit } from '@angular/core';
import { DetailsBriefcaseComponent } from '../details-briefcase/details-briefcase.component';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.css']
})
export class BriefcaseComponent implements OnInit {
  categorias: { id: any; nombre: any; }[] | undefined;
  nombreCategoria: any;
  idCategoriaSeleccionada: any;

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  constructor(private cursosService: CoursesService,) { }


  obtenerCategorias() {
    this.cursosService.obtenerCategorias().subscribe(
      (response) => {
        this.categorias = response.map(({ Id_Category: id, NameCategory: nombre }) => ({ id, nombre }));
        this.nombreCategoria = this.categorias[0]?.nombre; // Asignar el valor del primer elemento de la categoría al nombreCategoria
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerNombreCategoria(categoria: any): void {
    this.nombreCategoria = categoria.nombre;
    this.idCategoriaSeleccionada = categoria.id;
    this.obtenerCursos(categoria.id); // Obtener los cursos de la categoría seleccionada
  }
  obtenerCursos(id: any) {
    throw new Error('Method not implemented.');
  }

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
  
  /* MANEJO BOTON DE SEGUIR*/
  isActive = [false, false, false,false,false,false,false, false, false,false,false,false,false];
  buttonLabel = 'Seguir';
  
  toggleButton(index: number) {
    if (this.counters[index] === 0){
      this.isActive[index] = !this.isActive[index];
    } 
  }



}
