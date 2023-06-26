import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Person } from '../../interface/Person'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  Person:Person=new Person;
  password: string = '';
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPasswordVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  constructor(private fb: FormBuilder, private clients: ClientsService) {
    this.form = this.fb.group({
      Cedula:['',Validators.required],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Celular: ['', Validators.required,Number],
      Email: ['', Validators.required,EmailValidator],
      Password: ['', Validators.required],
      Rol:['User'],
      RolAd:['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

      const PersonSave:Person={
        Cedula:this.form.get('Cedula')?.value,
        Nombre: this.form.get('Nombre')?.value,
        Apellido: this.form.get('Apellido')?.value,
        Celular: this.form.get('Celular')?.value,
        Email: this.form.get('Email')?.value,
        Password: this.form.get('Password')?.value
      }

      this.clients.CreatePerson(PersonSave).subscribe(data=>{
        console.log(data);
        console.log("User created");

      })

      console.log(PersonSave);

  }
}