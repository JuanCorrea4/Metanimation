import { Component, OnInit } from '@angular/core';
import { LoadInfoUserService } from 'src/app/services/load-info-user.service';
import { UsersService } from 'src/app/services/users.service';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dataUser: any = {};
  usuarioDetails: { Id: any; IdPerson: any; Ocupation: any; PersonFullName: any; ImgPerfil: any; }[] | undefined; nameUsers: any;ocupacion: any; ImgPerfil: any; userId!: string; token: string | null | undefined;
  detailsProject: { IdProject: any; NameProject: any; DescriptionProject: any; Likes: any; ImgProject: any; ProjectCount: any; }[] | undefined; ProjectCount: any;
  news : [] = [];

  constructor(private loadInfoUser: LoadInfoUserService, private usuario: UsersService, private apiService: ApiService) { }

  llenarData() {
    this.apiService.getData().subscribe(dataNews => {
      this.news = dataNews;
      console.log(this.news)
    })
  }

  ngOnInit(): void {
    this.completarInfo()
    this.token = localStorage.getItem('token');
    // Obtener el ID del usuario del almacenamiento local
    this.userId = localStorage.getItem('userId') ?? '';
    this.obtenerDetailsPerson(this.userId);
    this.obtenerDetailsProject(this.userId);
  }
  completarInfo(){
    this.loadInfoUser.getInfo().subscribe(dataUser => {
      this.dataUser = dataUser;
    })
  }
  obtenerDetailsPerson(userId: string) {
    this.usuario.obtenerDetailsPerson(userId).subscribe(
      (response) => {
        this.usuarioDetails = response.map(({ Id, IdPerson, Ocupation, PersonFullName, ImgPerfil }) => ({
          Id: Id,
          IdPerson: IdPerson,
          Ocupation: Ocupation,
          PersonFullName: PersonFullName,
          ImgPerfil: ImgPerfil,
        }));
        this.nameUsers = this.usuarioDetails[0].PersonFullName;
        this.ocupacion = this.usuarioDetails[0].Ocupation;
        this.ImgPerfil = this.usuarioDetails[0].ImgPerfil;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerDetailsProject(userId: string) {
    this.usuario.obtenerDetailsProyecto(userId).subscribe(
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
}
