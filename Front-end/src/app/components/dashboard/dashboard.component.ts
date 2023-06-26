import { Component, OnInit } from '@angular/core';
import { LoadInfoUserService } from 'src/app/services/load-info-user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dataUser: any = {};

  constructor(private loadInfoUser: LoadInfoUserService) { }

  ngOnInit(): void {
    this.completarInfo()
  }
  completarInfo(){
    this.loadInfoUser.getInfo().subscribe(dataUser => {
      this.dataUser = dataUser;
      console.log(this.dataUser)
    })
  }
}
