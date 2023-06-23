import { Component, OnInit } from '@angular/core';
import { BriefcaseService } from 'src/app/services/briefcase.service'; 
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.css']
})
export class BriefcaseComponent implements OnInit {

  categorias: { id: any; nombre: any; }[] | undefined; nombreCategoria: any; idCategoriaSeleccionada: any; detailsProject: { IdProject: any; NameProject: any; DescriptionProject: any; Likes: any; ImgProject: any; }[] | undefined;   idProject: any; likes: any; nameProject: any; descriptionProject: any; imgProject: any; nameuser: any; ocupation: any;
  allProject: any;


  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerDetailsProject();
  }

  constructor(private cursosService: CoursesService, private project: BriefcaseService) { }


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


  obtenerDetailsProject() {
    this.project.obtenerAllPortafolios().subscribe(
      (response) => {
        console.log('Holaaa', response);
  
        // Verificar si la respuesta es un arreglo con al menos un elemento
        if (response && response.length > 0) {
          // Acceder al primer elemento de la respuesta
          const firstProject = response[0];
          // Asignar los valores a las propiedades del componente
          this.allProject = response;
          this.nameProject = firstProject.NameProject;
          this.descriptionProject = firstProject.DescriptionProject;
          this.likes = firstProject.Likes;
          this.imgProject = firstProject.ImgProject;
          this.nameuser = firstProject.PersonFullName;
          this.ocupation = firstProject.Ocupation;
        }
      },
      (error) => {
        console.error(error);
      }
    );
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
