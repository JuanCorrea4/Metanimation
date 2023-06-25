import { Component, OnInit } from '@angular/core';
import { BriefcaseService } from 'src/app/services/briefcase.service'; 
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details-briefcase',
  templateUrl: './details-briefcase.component.html',
  styleUrls: ['./details-briefcase.component.css']
})
export class DetailsBriefcaseComponent implements OnInit {
  project: any; nameProject: any; descriptionProject: any; likes: any; imgProject: any; nameuser: any; ocupation: any; imgPerfil: any; ubication: any;
  projectId: any;
  projectDetailsId: any[] | undefined;
  projectImageUrls: any;
  toolNames: any;
  nameProjects: any;

  constructor(private projects: BriefcaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = params['id'];
      console.log('ID del proyecto:', this.projectId);
      this.obtenerDetailsProject();
      this.ObtenerDetalleProyectotId(this.projectId);
    });
  }
  
  
  obtenerDetailsProject() {
    this.projects.obtenerAllPortafolios().subscribe(
      (response) => {
        console.log('Holaaa', response);
  
        // Verificar si la respuesta es un arreglo con al menos un elemento
        if (response && response.length > 0) {
          // Asignar una copia del arreglo de respuesta a this.project
          this.project = [...response];
          // Acceder al primer elemento de la respuesta
          const firstProject = response[0];
          // Asignar los valores a las propiedades del componente
          this.nameProjects = firstProject.NameProject;
          this.imgProject = firstProject.ImgProject;
          this.nameuser = firstProject.PersonFullName;
          this.imgPerfil = firstProject.ImgPerfil ;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ObtenerDetalleProyectotId(idproject: string) {
    this.projects.obtenerProyecto(idproject).subscribe(
      (response) => {
        console.log('Holaaa id proyecto', response);
  
        // Verificar si la respuesta es un arreglo con al menos un elemento
        if (response && response.length > 0) {
          // Acceder al primer elemento de la respuesta
          const idProject = response[0];
          // Asignar los valores a las propiedades del componente
          this.nameProject = idProject.NameProject;
          this.descriptionProject = idProject.DescriptionProject;
          this.likes = idProject.Likes;
          this.nameuser = idProject.PersonFullName;
          this.ocupation = idProject.Ocupation;
          this.imgPerfil = idProject.ImgPerfil ;
          this.ubication = idProject.Ubication;
          console.log('nameTools:', idProject.nameTools);
          this.toolNames = idProject.nameTools.replace(/[\[\]\"]+/g, '').split(",");
  
          const imgUrls = JSON.parse(idProject.ImgsProject);
          this.imgProject = imgUrls.map((img: string) => img.replace(/\\/g, '').replace(/"/g, ''));
          console.log('imgProject:', this.imgProject);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
    /*MANEJO BOTON FAVORITOS*/
    counters= [0,0,0,0];
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
isActive = [false, false, false,false];
buttonLabel = 'Seguir';

toggleButton(index: number) {
  if (this.counters[index] === 0){
    this.isActive[index] = !this.isActive[index];
  } 
}

}
