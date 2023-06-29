import { Component, OnInit } from '@angular/core';
import { BriefcaseService } from 'src/app/services/briefcase.service'; 
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-briefcase-project',
  templateUrl: './briefcase-project.component.html',
  styleUrls: ['./briefcase-project.component.css']
})
export class BriefcaseProjectComponent implements OnInit {
  allArtist: any[] | undefined; imgPerfil: any; descriptionP: any; imgProject: any; nameuser: any; ocupation: any; ubication: any;
  iduser: any;

  constructor(private authService: AuthService, private usuario: UsersService, private project: BriefcaseService) { }

  ngOnInit(): void {
    this.obtenerAllArtist()
  }

  obtenerAllArtist() {
    this.project.obtenerAllArtist().subscribe(
      (response) => {
        console.log('Holaaa', response);
  
        // Verificar si la respuesta es un arreglo con al menos un elemento
        if (response && response.length > 0) {
          // Acceder al primer elemento de la respuesta
          const artist = response[0];
          // Asignar los valores a las propiedades del componente
          this.allArtist = response;
          this.nameuser = artist.PersonFullName;
          this.iduser = artist.IdUsuario;
          this.ocupation = artist.Ocupation;
          this.ubication = artist.Ubication;
          this.descriptionP = artist.DescriptionPerson;
          this.imgPerfil = artist.ImgPerfil;
          // Parsear la cadena JSON de ImgsProject y obtener un array de URLs
  
          const imgUrls = JSON.parse(artist.ImgsProject);
          this.imgProject = imgUrls.map((img: string) => img.replace(/\\/g, '').replace(/"/g, ''));
          console.log('imgProject:', this.imgProject);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // Agrega este método al componente
getProcessedImages(images: string): string[] {
  return images.split(',').map((img: string) => img.trim()).slice(0, 3);
}

  
}
