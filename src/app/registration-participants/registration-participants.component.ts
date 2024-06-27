import { Component, OnInit, inject } from '@angular/core';
import { IParticipants } from '../interfaces/participants.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantsService } from '../services/api_serivices/participants/participants.service';
import { CommonModule } from '@angular/common';
import { UniversitiesService } from '../services/api_serivices/universities/universities.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface IUniversities {
  Id_Universidades: string;
  Nombre_Universidad: string;
  city: string;
  province: string;
}

interface RegisterForm {
  card: FormControl<string | null>;
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  document: FormControl<string | null>;
  idUniversity: FormControl<number | null>;
  status: FormControl<boolean | null>;
}

@Component({
  selector: 'app-registration-participants',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './registration-participants.component.html',
  styleUrls: ['./registration-participants.component.css']
})
export class RegistrationParticipantsComponent implements OnInit {
  registerForm: FormGroup<RegisterForm>;
  universitys: any[] = [];
  private universitiesService = inject(UniversitiesService);
  private snackBar: MatSnackBar;

  constructor(
    private fb: FormBuilder,
    private participantsService: ParticipantsService,
    private router: Router,
    snackBar: MatSnackBar
  ) {
    this.snackBar = snackBar;
    this.registerForm = this.fb.group<RegisterForm>({
      card: this.fb.control<string | null>(null, [Validators.required, Validators.pattern('^[0-9]{1,10}$'), Validators.min(1)]),
      name: this.fb.control<string | null>(null, [Validators.required]),
      lastName: this.fb.control<string | null>(null, [Validators.required]),
      email: this.fb.control<string | null>(null, [Validators.required, Validators.email]),
      document: this.fb.control<string | null>(null, [Validators.required]),
      idUniversity: this.fb.control<number | null>(null, [Validators.required]),
      status: this.fb.control<boolean | null>(false, [Validators.required]) // Inicializa 'status' como false
    });
  }

  ngOnInit(): void {
    this.loadUniversitys();
  }

  loadUniversitys() {
    this.universitiesService.getUniversities().subscribe(data => {
      this.universitys = data.data;
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newParticipant: IParticipants = {
        card: this.registerForm.get('card')?.value || '',
        name: this.registerForm.get('name')?.value || '',
        lastName: this.registerForm.get('lastName')?.value || '',
        email: this.registerForm.get('email')?.value || '',
        document: this.registerForm.get('document')?.value || '',
        idUniversity: this.registerForm.get('idUniversity')?.value || 0,
        status: this.registerForm.get('status')?.value || false
      };

      this.participantsService.createParticipant(newParticipant).subscribe(
        response => {
          console.log('Participant registered successfully', response);
          this.snackBar.open('Participante registrado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error registering participant', error);
          this.snackBar.open('Error al registrar al participante, inténtelo nuevamente', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.showErrors();
    }
  }

  showErrors() {
    const controls = this.registerForm.controls;
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
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido';
    }
    if (control?.hasError('pattern')) {
      return 'La cédula debe contener únicamente números';
    }
    if (control?.hasError('min')) {
      return 'La cédula debe ser un número entero positivo';
    }
    if (control?.hasError('maxlength')) {
      return 'La cédula debe contener máximo 10 dígitos';      
    }
    return '';
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      card: 'Cédula',
      name: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo',
      document: 'Documento Habilitante',
      idUniversity: 'Universidad',
      status: 'Estado'
    };
    return fieldNames[key] || key;
  }

  regresar() {
    this.router.navigate(['/']);
  }

  registrarConcurso() {
    if (this.registerForm.valid) {
      const newParticipant: IParticipants = {
        card: this.registerForm.get('card')?.value || '',
        name: this.registerForm.get('name')?.value || '',
        lastName: this.registerForm.get('lastName')?.value || '',
        email: this.registerForm.get('email')?.value || '',
        document: this.registerForm.get('document')?.value || '',
        idUniversity: this.registerForm.get('idUniversity')?.value || 0,
        status: true
      };

      this.participantsService.createParticipant(newParticipant).subscribe(
        response => {
          console.log('Participant registered successfully', response);
          this.snackBar.open('Participante registrado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/registrar-concurso']);
        },
        error => {
          console.error('Error registering participant', error);
          this.snackBar.open('Error al registrar al participante, inténtelo nuevamente', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.showErrors();
    }
  }
}
