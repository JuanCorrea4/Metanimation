import { Component, OnInit, Renderer2 ,ElementRef  } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DetailsCourseComponent } from '../details-course/details-course.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  nombreCategoria: any;
  nombreCurso: any;
  cursos: any[] | undefined;
  cursosCategoria: any[] | undefined; // Cursos de la categoría seleccionada
  allCursos: any[] | undefined;
  profesores: any[] | undefined;
  public url: string = '';
  idCategoriaSeleccionada: any;
  idCursoSeleccionado: any;
  descripcionCurso: any;
  nameCurso: any;
  duracion: any;
  lenguaje: any;
  valueCourses: any;
  nombreProfeSeleccionado: any;
  experienciaSeleccionada: any;
  profesionSeleccionada: any;
  categorias: { id: any; nombre: any; }[] | undefined;
  urlSeleccionada: string | undefined;
  public videoUrl: SafeResourceUrl | undefined;
  ultimosCursos: any[]| undefined;
  primerosCursos: any[]| undefined;

  constructor(private cursosService: CoursesService, private sanitizer: DomSanitizer, private renderer: Renderer2, private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerAllcourses();
    const idCategoriaPorDefecto = '10'; // Reemplaza con el ID de la categoría por defecto
    this.obtenerCursos(idCategoriaPorDefecto);
  } 

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

         // Redireccionar al componente DetailCoursesComponent con el ID del curso como parámetro de ruta
  obtenerDetalleCurso(idCurso: string) {
    this.router.navigate(['detailsCourse', idCurso]);
  }

  obtenerDetalleCurso2(idCategoriaPorDefecto: string) {
    this.router.navigate(['detailsCourse', idCategoriaPorDefecto]);
  }

  obtenerCursos(idCategoria: string) {
    this.cursosService.obtenerCursos(idCategoria).subscribe(
      (response) => {
        this.cursosCategoria = response.filter(curso => curso.Id === Number(idCategoria)).map(curso => {
          return {
            id: curso.Id,
            url: curso.Url,
            tema: curso.NameCourse,
            duracionCourse: curso.durationCourse,
            lenguajeCourse: curso.Lenguaje,
            courseValue: curso.ValueCourse,
            descripcion: curso.DescriptionCourse,
            idteacher: curso.IdTeacher
          };
        });
  
        // Asignar la primera URL a la variable urlSeleccionada de los cursos de la categoría seleccionada
        if (this.cursosCategoria.length > 0) {
          const idCurso = this.cursosCategoria[0].id; // Obtener el ID del curso
          const idTeacher = this.cursosCategoria[0].idteacher.toString(); // Convertir el idTeacher a una cadena
          this.urlSeleccionada = this.cursosCategoria[0].url;
          this.descripcionCurso = this.cursosCategoria[0].descripcion;
          this.duracion = this.cursosCategoria[0].duracionCourse;
          this.lenguaje = this.cursosCategoria[0].lenguajeCourse;
          this.valueCourses = this.cursosCategoria[0].courseValue;
          this.nameCurso = this.cursosCategoria[0].tema;

          // Llamar a la función obtenerProfesor con el ID del profesor
          this.obtenerProfesor(idTeacher);
          console.log(idTeacher);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  obtenerAllcourses() {
    this.cursosService.obtenerAllCursos().subscribe(
      (response) => {
        this.cursos = response.map(({ Id: id, NameCourse: name, DescriptionCourse: description, IdTeacher: idTeacher, ImgCourse: imgCourse , durationCourse: duracion}) => ({ id, name, description, idTeacher, duracion, imgCourse}));
        this.nameCurso = this.cursos[0]?.name;

        // Ordenar los cursos por ID en orden descendente
        this.cursos.sort((a, b) => b.id - a.id);

        // Obtener los últimos 3 cursos
        this.ultimosCursos = this.cursos.slice(0, 5);

        console.log(this.ultimosCursos);

        // Obtener los primeros 3 cursos
        this.primerosCursos = this.cursos.slice(0, 3);
      },
      (error) => {
        console.error(error);
      }
    );
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
  
  
  
  getSafeVideoUrl(): SafeResourceUrl {
    if (!this.urlSeleccionada) {
      return ''; // O cualquier otro valor predeterminado en caso de que no haya URL seleccionada
    }
    const videoUrl = 'https://www.youtube.com/embed/' + this.urlSeleccionada;

    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  /*MANEJO BOTON CALIFICACIÓN*/
  counters = [0, 0, 0, 0, 0];
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

  /*MANEJO BOTON CALIFICACIÓN CURSO*/
  countersCourse = [0, 0, 0, 0, 0];
  qualificationCourse = 0;

  toggleCourse(index: number) {
    if (this.countersCourse[index] === 0) {
      this.countersCourse[index]++;
      this.qualificationCourse++;
    } else {
      this.countersCourse[index]--;
      this.qualificationCourse--;
    }
  }

  slideContainerLeft(): void {
    const container = this.elementRef.nativeElement.querySelector('.challenge-container');
    container.style.transform = 'translateX(5%)';
  }  
  slideContainerRight(): void {
    const container = this.elementRef.nativeElement.querySelector('.challenge-container');
    container.style.transform = 'translateX(-180%)';
  }

}
