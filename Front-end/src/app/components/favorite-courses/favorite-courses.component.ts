import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-favorite-courses',
  templateUrl: './favorite-courses.component.html',
  styleUrls: ['./favorite-courses.component.css']
})
export class FavoriteCoursesComponent implements OnInit {
  nombreCategoria: any;
  cursos: any[] | undefined;
  profesores: any[] | undefined;
  public url: string = '';
  idCategoriaSeleccionada: any;
  descripcionCurso: any;
  nombreProfeSeleccionado: any;
  experienciaSeleccionada: any;
  profesionSeleccionada: any;
  categorias: { id: any; nombre: any; }[] | undefined;
  urlSeleccionada: string | undefined;
  public videoUrl: SafeResourceUrl | undefined;


  ngOnInit(): void {
    this.obtenerCategorias();
    const idCategoriaPorDefecto = '10'; // Reemplaza con el ID de la categoría por defecto
    this.obtenerCursos(idCategoriaPorDefecto);
  }
  constructor(private cursosService: CoursesService, private sanitizer: DomSanitizer) {}
 /*OBTENER INFORMACION DE LAS CATEGORIAS */
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
  }

  /*OBTENER INFORMACION DE LOS CURSOS */
  obtenerCursos(idCategoria: string) {
    this.cursosService.obtenerCursos(idCategoria).subscribe(
      (response) => {
        this.cursos = response.filter(curso => curso.Id === Number(idCategoria)).map(curso => {
          return {
            id: curso.Id,
            url: curso.Url,
            descripcion: curso.DescriptionCourse,
            idteacher: curso.IdTeacher,
          };
        });
  
        // Asignar la primera URL a la variable urlSeleccionada
        if (this.cursos.length > 0) {
          const idTeacher = this.cursos[0].idteacher; // Obtener el ID del profesor
          this.urlSeleccionada = this.cursos[0].url;
          this.descripcionCurso = this.cursos[0].descripcion;

          // Llamar a la función obtenerProfesor con el ID del profesor
          this.obtenerProfesor(idTeacher);
        }
      },
      (error) => {
        console.error(error);
      }

    );
  }
  
  getSafeVideoUrl(): SafeResourceUrl {
    if (!this.urlSeleccionada) {
      return ''; // O cualquier otro valor predeterminado en caso de que no haya URL seleccionada
    }
    const videoUrl = 'https://www.youtube.com/embed/' + this.urlSeleccionada;
  
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
  obtenerProfesor(idTeacher: string) {
    this.cursosService.obtenerProfesor(idTeacher).subscribe(
      (response) => {
        const profesor = response.find((profesor) => profesor.Id_Teacher === Number(idTeacher)); // Filtrar el arreglo de respuesta
  
        if (profesor) {
          this.profesores = [{
            Id_Teacher: profesor.Id_Teacher,
            name: profesor.Name,
            Profesion: profesor.Profesion,
            Experience: profesor.Experience
          }];
  
          this.nombreProfeSeleccionado = profesor.Name;
          this.experienciaSeleccionada = profesor.Experience;
          this.profesionSeleccionada = profesor.Profesion;
        } 
  
        console.log(this.profesores);
      },
      (error) => {
        console.error(error);
      }
    );
  }

        /*MANEJO BOTON CALIFICACIÓN*/
        counters= [0,0,0,0,0];
        qualification = 0;
      
        toggleQualification(index: number) {
          if (this.counters[index] === 0) {
            this.counters[index]++;
            this.qualification++;
          } else {
            this.counters[index]--;
            this.qualification--;
          }
        
      }


}
