import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { CommonModule } from '@angular/common';
import { ISpeakers } from '../interfaces/speakers.interface';
import { SpeakersService } from '../services/api_serivices/speakers/speakers.service';

@Component({
  selector: 'app-registration-speakers',
  standalone: true,
  templateUrl: './registration-speakers.component.html',
  styleUrls: ['./registration-speakers.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatSnackBarModule]
})
export class RegistrationSpeakersComponent implements OnInit {
  speakersService = inject(SpeakersService);
  router = inject(Router);
  // Agrega MatSnackBar al constructor
  constructor(private snackBar: MatSnackBar) {}

  speakers = new FormGroup({
    card: new FormControl<any>('', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]),
    name: new FormControl<any>('', [Validators.required]),
    lastName: new FormControl<any>('', [Validators.required]),
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    phone: new FormControl<any>('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
    biography: new FormControl<any>('', [Validators.required]),
    topic: new FormControl<any>('', [Validators.required])
  });

  ngOnInit() {}

  onSubmit() {
    if (this.speakers.valid) {
      const speakerData: ISpeakers = {
        card: this.speakers.get('card')?.value,
        name: this.speakers.get('name')?.value,
        lastName: this.speakers.get('lastName')?.value,
        email: this.speakers.get('email')?.value,
        phone: this.speakers.get('phone')?.value,
        biography: this.speakers.get('biography')?.value,
        topic: this.speakers.get('topic')?.value
      };

      this.speakersService.createSpeaker(speakerData).subscribe(
        response => {
          // Utiliza MatSnackBar para mostrar mensaje de éxito
          this.snackBar.open('Ponente registrado con éxito', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          this.router.navigate(['/speakers-list']);
        },
        error => {
          // Utiliza MatSnackBar para mostrar mensaje de error
          this.snackBar.open('Error al registrar ponente', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
        }
      );
    } else {
      // Utiliza MatSnackBar para mostrar mensaje de formulario inválido
      this.snackBar.open('Formulario inválido', 'Cerrar', {
        duration: 3000, // Duración del mensaje en milisegundos
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.speakers.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido';
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'card') {
        return 'La cédula debe tener solo números';
      }
      if (controlName === 'phone') {
        return 'El teléfono debe tener entre 10 y 15 dígitos';
      }
    }
    return '';
  }
}
