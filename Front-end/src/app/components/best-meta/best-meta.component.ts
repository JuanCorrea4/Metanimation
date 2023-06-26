import { Component, OnInit, ElementRef} from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-best-meta',
  templateUrl: './best-meta.component.html',
  styleUrls: ['./best-meta.component.css']
})
export class BestMetaComponent implements OnInit {
selectedValue: any;
  categorias: { id: any; nombre: any; }[] | undefined;
  nombreCategoria: any;
  idCategoriaSeleccionada: any;

  ngOnInit(): void {
    this.obtenerCategorias();
  }
  constructor(private cursosService: CoursesService, private elementRef: ElementRef) { }

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

  /*MANEJO BOTON FAVORITOS*/
  counters= [0,0,0,0,0,0];
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
isActive = [false, false, false,false,false,false];
buttonLabel = 'Seguir';

toggleButton(index: number) {
  if (this.counters[index] === 0){
    this.isActive[index] = !this.isActive[index];
  } 
}


  slideContainerLeft(): void {
    const container = this.elementRef.nativeElement.querySelector('.filter-carrete');
    container.style.transform = 'translateX(+5%)';
  }  
  slideContainerRight(): void {
    const container = this.elementRef.nativeElement.querySelector('.filter-carrete');
    container.style.transform = 'translateX(-5%)';
  }


}
