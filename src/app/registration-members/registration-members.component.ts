import { Component, inject } from '@angular/core';
import { UserService } from '../services/api_serivices/user/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISignUp } from '../interfaces/userAuth.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

interface RegisterForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  card: FormControl<string | null>;
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  semester: FormControl<string | null>;
  major: FormControl<number | null>;
  rol: FormControl<number | null>;
}

@Component({
  selector: 'app-registration-members',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration-members.component.html',
  styleUrls: ['./registration-members.component.css']
})
export class RegistrationMembersComponent {
  member = inject(UserService);
  router = inject(Router);
  user: any;
  private snackBar: MatSnackBar;

  register = new FormGroup<RegisterForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    card: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    semester: new FormControl('', [Validators.required]),
    major: new FormControl<number | null>(null, [Validators.required]),
    rol: new FormControl<number | null>(null, [Validators.required])
  });

  constructor(snackBar: MatSnackBar) {
    this.snackBar = snackBar;
  }

  onSignUp() {
    if (this.register.valid) {
      const signUpData: ISignUp = {
        email: this.register.get('email')?.value || '',
        password: this.register.get('password')?.value || '',
        card: this.register.get('card')?.value || '',
        name: this.register.get('name')?.value || '',
        lastName: this.register.get('lastName')?.value || '',
        semester: this.register.get('semester')?.value || '',
        major: this.register.get('major')?.value || 0,
        rol: this.register.get('rol')?.value || 0
      };

      this.member.signUpUserMember(signUpData).subscribe(
        response => {
          this.user = response;
          this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/miembros']);
        },
        error => {
          this.snackBar.open('Error al registrar', 'Cerrar', { duration: 3000 });
          console.error('Error al registrar', error);
        }
      );
    } else {
      this.showErrors();
    }
  }

  showErrors() {
    const controls = this.register.controls;
    Object.keys(controls).forEach(key => {
      const control = controls[key as keyof RegisterForm];
      if (control.invalid) {
        const invalidControl = document.querySelector(`[formControlName="${key}"]`);
        invalidControl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (invalidControl as HTMLElement)?.focus();
        this.snackBar.open(`Por favor, complete el campo ${this.getFieldName(key)}`, 'Cerrar', { duration: 3000 });
        return;
      }
    });
  }

  getErrorMessage(controlName: keyof RegisterForm): string {
    const control = this.register.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido';
    }
    return '';
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      email: 'Correo',
      password: 'Clave',
      card: 'Cedula',
      name: 'Nombre',
      lastName: 'Apellido',
      semester: 'Semestre',
      major: 'Carrera',
      rol: 'Rol'
    };
    return fieldNames[key] || key;
  }
}