import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUniversities } from '../interfaces/universities.interface';
import { CommonModule } from '@angular/common';
import { UniversitiesService } from '../services/api_serivices/universities/universities.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar

@Component({
  selector: 'app-university',
  standalone: true,
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class UniversityComponent implements OnInit {
  universitiesService = inject(UniversitiesService);
  router = inject(Router);
  snackBar: MatSnackBar;

  universitiesForm = new FormGroup({
    name: new FormControl<any>('', [Validators.required]),
    city: new FormControl<any>('', [Validators.required]),
    province: new FormControl<any>('', [Validators.required]),
  });

  constructor(snackBar: MatSnackBar) {
    this.snackBar = snackBar;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.universitiesForm.valid) {
      const universityData: IUniversities = {
        name: this.universitiesForm.get('name')?.value,
        city: this.universitiesForm.get('city')?.value,
        province: this.universitiesForm.get('province')?.value,
      };

      this.universitiesService.createUniversity(universityData).subscribe(
        response => {
          this.snackBar.open('Universidad registrada exitosamente', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          console.log('Universidad registrada con éxito', response);
          this.router.navigate(['/universidades']);
        },
        error => {
          this.snackBar.open('Error al registrar la universidad', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          console.error('Error al registrar universidad', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  closeForm() {
    this.router.navigate(['/university-list']);
  }
}
