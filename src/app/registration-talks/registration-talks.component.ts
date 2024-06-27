import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { CommonModule } from '@angular/common';
import { ITalks } from '../interfaces/talks.interface';
import { TalksService } from '../services/api_serivices/talks/talks.service';

@Component({
  selector: 'app-registration-talks',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './registration-talks.component.html',
  styleUrls: ['./registration-talks.component.css']
})
export class RegistrationTalksComponent implements OnInit {
  talksService = inject(TalksService);
  router = inject(Router);
  minStartDate!: string;
  minEndDate!: string;
  // Agrega MatSnackBar al constructor
  constructor(private snackBar: MatSnackBar) {}

  talks = new FormGroup({
    topic: new FormControl<any>('', [Validators.required]),
    image: new FormControl<any>('', [Validators.required, Validators.pattern('(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))')]), // Añade validación para URL de imagen
    startDate: new FormControl<any>('', [Validators.required]),
    endDate: new FormControl<any>('', [Validators.required]),
    status: new FormControl<any>('', [Validators.required])
  });

  ngOnInit() {
    this.minStartDate = new Date().toISOString().split('T')[0];
    this.minEndDate = this.minStartDate;
  }

  updateEndDateMin() {
    this.minEndDate = this.talks.get('startDate')?.value || this.minStartDate;
  }

  onSubmit() {
    if (this.talks.valid) {
      const talkData: ITalks = {
        topic: this.talks.get('topic')?.value,
        image: this.talks.get('image')?.value,
        startDate: this.talks.get('startDate')?.value,
        endDate: this.talks.get('endDate')?.value,
        status: this.talks.get('status')?.value
      };

      this.talksService.createTalk(talkData).subscribe(
        response => {
          // Utiliza MatSnackBar para mostrar mensaje de éxito
          this.snackBar.open('Charla registrada con éxito', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          this.router.navigate(['/talks-list']);
        },
        error => {
          // Utiliza MatSnackBar para mostrar mensaje de error
          this.snackBar.open('Error al registrar charla', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          console.error('Error al registrar charla', error);
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
    const control = this.talks.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'image') {
        return 'Ingrese una URL válida de imagen (jpg, png, jpeg, gif, svg)';
      }
    }
    return '';
  }
}
