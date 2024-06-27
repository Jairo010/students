import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { CommonModule } from '@angular/common';

interface RegisterForm {
  type: FormControl<string | null>;
  numParticipants: FormControl<number | null>;
  price: FormControl<number | null>;
  status: FormControl<string | null>;
}

@Component({
  selector: 'app-registration-competitions',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration-competitions.component.html',
  styleUrls: ['./registration-competitions.component.css']
})
export class RegistrationCompetitionsComponent {
  competitionService = inject(CompetitionsService);
  router = inject(Router);
  private snackBar: MatSnackBar;

  register = new FormGroup<RegisterForm>({
    type: new FormControl('', [Validators.required]),
    numParticipants: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    status: new FormControl('', [Validators.required])
  });

  constructor(snackBar: MatSnackBar) {
    this.snackBar = snackBar;
  }

  onSignUp() {
    if (this.register.valid) {
      const competitionData = {
        type: this.register.get('type')?.value || '',
        numParticipants: this.register.get('numParticipants')?.value || 0,
        price: this.register.get('price')?.value || 0,
        status: this.register.get('status')?.value || ''
      };

      this.competitionService.createCompetition(competitionData).subscribe({
        next: (response) => {
          this.snackBar.open('Competición registrada exitosamente', 'Cerrar', { duration: 3000 });
          console.log('Registro exitoso', response);
          this.router.navigate(['/competitions-list']);
        },
        error: (error) => {
          this.snackBar.open('Error al registrar la competición', 'Cerrar', { duration: 3000 });
          console.error('Error al registrar', error);
        }
      });
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
    if (control?.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}`;
    }
    return '';
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      type: 'Tipo de Concurso',
      numParticipants: 'Número Máximo de Participantes',
      price: 'Valor de Inscripción',
      status: 'Estado'
    };
    return fieldNames[key] || key;
  }
}