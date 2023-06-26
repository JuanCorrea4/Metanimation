import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  showPassword: boolean = false;
  password: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });    
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      const credentials = {
        email: this.form.get('Email')?.value,
        Password: this.form.get('Password')?.value,
      };

      this.authService.login(credentials)
        .then(() => {
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['dashboard']);
        })
        .catch(error => {
          console.error('Error al iniciar sesión:', error);
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
