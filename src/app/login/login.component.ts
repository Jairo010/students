import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { CoreModule } from "../core/core.module";
import { UserService } from '../services/api_serivices/user/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../interfaces/userAuth.interface';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CoreModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
  constructor(private router: Router, private member: UserService, private snackBar: MatSnackBar) {}

  registrarse() {
    this.router.navigate(['/participantes']);
  }

  loginError = false;
  user: any;

  login = new FormGroup({
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    password: new FormControl<any>('', [Validators.required]),
  });

  onLogin() {
    if (this.login.valid) {
      const loginData: ILogin = {
        email: this.login.get('email')?.value,
        password: this.login.get('password')?.value,
      };

      this.member.logInUserMember(loginData).subscribe(
        response => {
          this.user = response;
          this.snackBar.open("Inicio de sesión correcto", "Cerrar", {
            duration: 3000,
          });
          this.router.navigate(['miembros']);
        },
        error => {
          this.snackBar.open("Error de autenticación", "Cerrar", {
            duration: 3000,
          });
          console.error('Error de autenticación', error);
          this.loginError = true;
        }
      );
    } else {
      this.snackBar.open("Formulario invalido", "Cerrar", {
        duration: 3000,
      });
    }
  }
}
