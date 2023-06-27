import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Person } from '../../interface/Person';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  Person: Person = new Person;
  password: string = '';
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPasswordVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  onKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Permite solo números del 0 al 9
    if (!/^[0-9]+$/.test(keyValue)) {
      event.preventDefault();
      return false;
    }
    return true
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  

  constructor(private fb: FormBuilder, private clients: ClientsService) {
    this.form = this.fb.group({
      Cedula: ['', Validators.required],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Celular: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      Rol: ['User'],
      RolAd: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const PersonSave: Person = {
      Cedula: this.form.get('Cedula')?.value,
      Nombre: this.form.get('Nombre')?.value,
      Apellido: this.form.get('Apellido')?.value,
      Celular: this.form.get('Celular')?.value,
      Email: this.form.get('Email')?.value,
      Password: this.form.get('Password')?.value
    };

    this.clients.CreatePerson(PersonSave).subscribe(data => {
      console.log(data);
      console.log("User created");
    });

    console.log(PersonSave);
  }


}
