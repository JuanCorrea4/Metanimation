import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { BriefcaseService } from 'src/app/services/briefcase.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile-artist',
  templateUrl: './profile-artist.component.html',
  styleUrls: ['./profile-artist.component.css']
})
export class ProfileArtistComponent implements OnInit {
  selectedImage: File | undefined; nameTools: any; detailsProject: { IdProject: any; NameProject: any; DescriptionProject: any; ImgProject: any; ProjectCount: any; Likes:any; }[] | undefined;NameProject: any; DescriptionProject: any; Likes: any;ImgProject: any; ProjectCount: any;
  campoHabilitado: boolean | undefined; mostrarBotonGuardar: boolean | undefined;  campoTexto: any; token: string | null | undefined; userId: string | null | undefined;
  usuarioDetails: { Id: any; IdPerson: any; DescriptionPerson: any; Ocupation: any; telefono: any; Facebook: any; Instagram: any; Youtube: any; Likes: any; Followers: any; Followed: any; Ubication: any;
  PersonFullName: any; ImgPerfil: any; Email: any; Tools: any }[] | undefined; youtube: any; instagram: any; facebook: any; telefono: any; ocupacion: any; ImgPerfil: any; email: any; tools: string[] = []; ubicacion: any; usuarioName: { Id: any; IdPerson: any; PersonName: any; PersonLastName: any; Email: any; }[] | undefined; PersonName: any; PersonLastName: any; correo: any; cantProjects: any; likes: any = 0; followers: any = 0;  followed: any = 0; nameUsers: any; description: any; city: any;
  public showModal: boolean = false;
  nombreProyecto: any;
  descripcionPoyecto: any;

  
  constructor(private authService: AuthService, private usuario: UsersService, private portafolio: BriefcaseService, private route: ActivatedRoute) { }


  /*MANEJO BOTON FAVORITOS*/
  counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  favoriteCount = 0;

  ngOnInit() {
    const id = this.route.snapshot.queryParams['id'];
    console.log('ID del proyecto:', id);
    
    // Resto del código aquí
    this.obtenerDetailsPerson(id);
    this.obtenerNamePerson(id);
    this.obtenerDetailsProject(id);
  }
  

  sendDetailsToServer(): void {
    if (this.userId && this.token) {
      const userDetails = {
        id: this.userId,
        token: this.token,
        DescriptionPerson: this.description,
        Ocupation: this.ocupacion,
        telefono: this.telefono,
        Ubication: this.ubicacion,
        Facebook: this.facebook,
        Instagram: this.instagram,
        Youtube: this.youtube,
        Likes: this.likes,
        Followers: this.followers,
        Followed: this.followed,
        ImgPerfil: this.selectedImage ? this.selectedImage.name : this.ImgPerfil // Verificar si this.selectedImage está definido
      };
  
      console.log('Enviando detalles al servidor:', userDetails);
  
      this.usuario.insertdetailsUsers(this.userId, userDetails, this.token)
        .then(() => {
          // Manejar la respuesta del servidor si es necesario
          // Realizar acciones adicionales después de enviar los datos
        })
        .catch(error => {
          // Manejar el error si ocurriera
        });
    } else {
      console.log('No se cumplen las condiciones necesarias para enviar los detalles al servidor.');
      console.log('this.userId:', this.userId);
    }
  }
  

  sendToolsToServer(): void {
    if (this.userId && this.token) {
      const userTools= {
        id: this.userId, // No es necesario convertirlo a entero
        token: this.token,
        nameTools: this.tools
      };

      console.log('Enviando detalles al servidor:', userTools);

      this.usuario.insertToolsUsers(this.userId, userTools, this.token)
        .then(() => {
          // Manejar la respuesta del servidor si es necesario
          // Realizar acciones adicionales después de enviar los datos
        })
        .catch(error => {
          // Manejar el error si ocurriera
        });
    } 
    else {
      console.log('No se cumplen las condiciones necesarias para enviar los detalles al servidor.');
      console.log('this.userId:', this.userId);
    }
  }

  sendProjectServer(): void {
    if (this.userId && this.token) {
      const userProject = {
        id: this.userId,
        token: this.token,
        DescripcionPoyecto: this.descripcionPoyecto,
        NombreProyecto: this.nombreProyecto,
        Img1: this.selectedImage ? this.selectedImage.name : this.ImgPerfil,
      };
      
  
      console.log('Enviando datos al servidor:', userProject);
  
      this.portafolio.insertProjectUsers(this.userId, userProject, this.token)
        .then(() => {
        })
        .catch(error => {
          // Manejar el error si ocurriera
        });
    } else {
      console.log('No se cumplen las condiciones necesarias para enviar los detalles al servidor.');
      console.log('this.userId:', this.userId);
    }
  }
  /*
  insertRecourse(projectId: number, imageUrl: string): void {
    const resource = {
      projectId: projectId,
      imgUrl: imageUrl
    };
  
    this.portafolio.insertRecourseProject()
      .then(() => {
        // Recurso insertado correctamente
      })
      .catch(error => {
        // Manejar el error si ocurriera
      });
  }
  */
  habilitarEdicion() {
    this.campoHabilitado = true;
    this.mostrarBotonGuardar = true;
  }

  guardarCambios() {
    // Lógica para guardar los cambios del detalle de persona 
    this.campoHabilitado = false;
    this.mostrarBotonGuardar = false;
  }

  obtenerDetailsPerson(userId: string) {
    this.usuario.obtenerDetailsPerson(userId).subscribe(
      (response) => {
        console.log(response)
        this.usuarioDetails = response.map(({ Id, IdPerson, DescriptionPerson, Ocupation, telefono, Facebook, Instagram, Youtube, Likes,
          Followers, Followed, PersonFullName, NameCities, ImgPerfil, Email, Tools, Ubication }) => ({
          Id: Id,
          IdPerson: IdPerson,
          DescriptionPerson: DescriptionPerson,
          Ocupation: Ocupation,
          telefono: telefono,
          Facebook: Facebook,
          Instagram: Instagram,
          Youtube: Youtube,
          Likes: Likes,
          Followers: Followers,
          Followed: Followed,
          PersonFullName: PersonFullName,
          NameCities: NameCities,
          ImgPerfil: ImgPerfil,
          Email: Email,
          Ubication: Ubication,
          Tools: JSON.parse(Tools.replace(/\\\"/g, '"')) // Reemplazar las comillas escapadas antes de analizar el JSON
        }));
        this.description = this.usuarioDetails[0].DescriptionPerson;
        this.likes = this.usuarioDetails[0].Likes;
        this.followers = this.usuarioDetails[0].Followers;
        this.followed = this.usuarioDetails[0].Followed;
        this.nameUsers = this.usuarioDetails[0].PersonFullName;
        this.ocupacion = this.usuarioDetails[0].Ocupation;
        this.telefono = this.usuarioDetails[0].telefono;
        this.facebook = this.usuarioDetails[0].Facebook;
        this.instagram = this.usuarioDetails[0].Instagram;
        this.youtube = this.usuarioDetails[0].Youtube;
        this.ImgPerfil = this.usuarioDetails[0].ImgPerfil;
        this.ubicacion = this.usuarioDetails[0].Ubication;
        this.tools = this.usuarioDetails[0].Tools;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerNamePerson(id: string) {
    this.usuario.obtenernamePerson(id).subscribe(
      (response) => {
        this.usuarioName = response.map(({ Id, IdPerson, Name, LastName, Email }) => ({
          Id: Id,
          IdPerson: IdPerson,
          PersonName: Name,
          PersonLastName: LastName,
          Email: Email,
        }));

        this.PersonName = this.usuarioName[0].PersonName;
        this.PersonLastName = this.usuarioName[0].PersonLastName;
        this.correo = this.usuarioName[0].Email;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerDetailsProject(id: string) {
    this.usuario.obtenerDetailsProyecto(id).subscribe(
      (response) => {
        console.log('Holaaa', response);
        this.detailsProject = response.map(({ IdProject, NameProject, DescriptionProject, Likes, ImgProject, ProjectCount }) => ({
          IdProject: IdProject,
          NameProject: NameProject,
          DescriptionProject: DescriptionProject,
          Likes: Likes,
          ImgProject: ImgProject,
          ProjectCount: ProjectCount,
        }));
        this.ProjectCount = this.detailsProject[0].ProjectCount;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  getProfileImage(): void {
    this.obtenerDetailsPerson(this.ImgPerfil);
  }
  
  uploadImage(): void {
    // Simular el clic en el input de tipo archivo para que el usuario pueda seleccionar una nueva imagen
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click(); // Agrega el operador de encadenamiento opcional
  }
  
  onFileSelected(event: any): void {
    // Obtener el archivo de imagen seleccionado por el usuario
    this.selectedImage = event.target.files[0];
    console.log('Imagen seleccionada:', this.selectedImage);
  }

  handleImage1Change(event: any): void {
    // Obtener el archivo de imagen seleccionado por el usuario
    this.selectedImage = event.target.files[0];
    console.log('Imagen seleccionada:', this.selectedImage);
  }
  handleImage2Change(event: any): void {
    // Obtener el archivo de imagen seleccionado por el usuario
    this.selectedImage = event.target.files[0];
    console.log('Imagen seleccionada:', this.selectedImage);
  }
  handleImage3Change(event: any): void {
    // Obtener el archivo de imagen seleccionado por el usuario
    this.selectedImage = event.target.files[0];
    console.log('Imagen seleccionada:', this.selectedImage);
  }
  handleImage4Change(event: any): void {
    // Obtener el archivo de imagen seleccionado por el usuario
    this.selectedImage = event.target.files[0];
    console.log('Imagen seleccionada:', this.selectedImage);
  }
  
  onFilesDropped(event: DragEvent): void {
    const files = event?.dataTransfer?.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      const reader: FileReader = new FileReader();
  
      reader.onload = (event: any) => {
        const imageBase64: string = event.target.result;
      
        // Guardar la imagen en la carpeta 'assets/profile'
        const imgPath: string = '/assets/profile/' + file.name;
        localStorage.setItem(imgPath, imageBase64);
      
        console.log('Imagen guardada:', imgPath);
      };
      
  
      reader.readAsDataURL(file);
    }
  }
  
  
  preventDefault(event: DragEvent): void {
    event.preventDefault();
  }
  
  
       /*MANEJO BOTON FAVORITOS*/  
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
  
}
