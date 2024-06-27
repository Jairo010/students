import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IEvents } from '../interfaces/events.interface';
import { CommonModule } from '@angular/common';
import { EventsService } from '../services/api_serivices/events/events.service';

interface EventForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  startDate: FormControl<string | null>;
  endDate: FormControl<string | null>;
  typeEvent: FormControl<string | null>;
  status: FormControl<string | null>;
}

@Component({
  selector: 'app-registration-events',
  standalone: true,
  templateUrl: './registration-events.component.html',
  styleUrls: ['./registration-events.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class RegistrationEventsComponent implements OnInit {
  events = inject(EventsService);
  router = inject(Router);
  private snackBar: MatSnackBar;
  minStartDate!: string;
  minEndDate!: string;

  eventos = new FormGroup<EventForm>({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    typeEvent: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(snackBar: MatSnackBar) {
    this.snackBar = snackBar;
  }

  ngOnInit() {
    this.minStartDate = new Date().toISOString().split('T')[0];
    this.minEndDate = this.minStartDate;
  }

  updateEndDateMin() {
    this.minEndDate = this.eventos.get('startDate')?.value || this.minStartDate;
  }

  onSubmit() {
    if (this.eventos.valid) {
      const eventData: IEvents = {
        name: this.eventos.get('name')?.value || '',
        description: this.eventos.get('description')?.value || '',
        startDate: new Date(this.eventos.get('startDate')?.value || ''),
        endDate: new Date(this.eventos.get('endDate')?.value || ''),
        typeEvent: this.eventos.get('typeEvent')?.value || '',
        status: this.eventos.get('status')?.value || ''
      };

      this.events.createEvent(eventData).subscribe({
        next: (response) => {
          this.snackBar.open('Evento registrado exitosamente', 'Cerrar', { duration: 3000 });
          console.log('Evento registrado con éxito', response);
          this.router.navigate(['/eventos']);
        },
        error: (error) => {
          this.snackBar.open('Error al registrar el evento', 'Cerrar', { duration: 3000 });
          console.error('Error al registrar evento', error);
        }
      });
    } else {
      this.showErrors();
    }
  }

  showErrors() {
    const controls = this.eventos.controls;
    Object.keys(controls).forEach(key => {
      const control = controls[key as keyof EventForm];
      if (control.invalid) {
        const invalidControl = document.querySelector(`[formControlName="${key}"]`);
        invalidControl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (invalidControl as HTMLElement)?.focus();
        this.snackBar.open(`Por favor, complete el campo ${this.getFieldName(key)}`, 'Cerrar', { duration: 3000 });
        return;
      }
    });
  }

  getErrorMessage(controlName: keyof EventForm): string {
    const control = this.eventos.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `Debe tener al menos ${requiredLength} caracteres`;
    }
    return '';
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      name: 'Nombre del evento',
      description: 'Descripción',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha de fin',
      typeEvent: 'Tipo de evento',
      status: 'Estado del evento'
    };
    return fieldNames[key] || key;
  }

  closeForm() {
    this.router.navigate(['/eventos']);
  }
}