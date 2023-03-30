import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/interface/Person';
import { Login } from 'src/app/interface/login';
import { ClientsService } from '../../services/clients.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  Person:Person=new Person;
  auth: any;
  route: any;
  constructor(private fb: FormBuilder, private clients: ClientsService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  ngOnInit(): void {
  }

  onSubmit() {
    

    if(this.form.valid) {
      const Login:Login={
      email: this.form.get('email')?.value,
      Password: this.form.get('Password')?.value,
  
    }

    
    this.clients.login(Login).subscribe(data=>{
      console.log(data);
      console.log("loguin");
      
    })

    console.log(Login);
  
}

    // (response: any) => {
      console.log(Response);
      //se almacena el token usando el servicio Auth
      //this.auth.login(Response.token)
      //se almacena el nombre del usuario en el almacenamiento de
      //sesion
     // this.auth.setCourrentUser(Response.name)
      //navegamos de nuevo al home, esta vez como usuario
      //logueado
      this.route.navigate( ['/inicio']);
  //},

  (error) => {

    console.log(error.status);

  };
  }
  
}

