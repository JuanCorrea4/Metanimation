import { Component, OnInit } from '@angular/core';
import { LoadInfoUserService } from 'src/app/services/load-info-user.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dataUser: any = {};
  usuarioDetails: { Id: any; IdPerson: any; Ocupation: any; PersonFullName: any; ImgPerfil: any; }[] | undefined;
  nameUsers: any;ocupacion: any; ImgPerfil: any; userId!: string; token: string | null | undefined;

  constructor(private loadInfoUser: LoadInfoUserService, private usuario: UsersService) { }

  ngOnInit(): void {
    this.completarInfo()
    this.token = localStorage.getItem('token');
    // Obtener el ID del usuario del almacenamiento local
    this.userId = localStorage.getItem('userId') ?? '';
    this.obtenerDetailsPerson(this.userId);
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
}
