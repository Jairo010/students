import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantsService } from '../services/api_serivices/participants/participants.service';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { GroupsService } from '../services/api_serivices/groups/groups.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface RegisterForm {
  card: FormControl<string | null>;
  idCompetition: FormControl<string | null>;
  idGroup: FormControl<string | null>;
  Clave_Grupo: FormControl<string | null>;
}

@Component({
  selector: 'app-registration-participant-competition',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './registration-participant-competition.component.html',
  styleUrls: ['./registration-participant-competition.component.css']
})
export class RegistrationParticipantCompetitionComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;
  competitions: any[] = [];
  groups: any[] = [];
  private participantsService = inject(ParticipantsService);
  private competitionsService = inject(CompetitionsService);
  private groupsService = inject(GroupsService);
  private snackBar: MatSnackBar;
  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    private router: Router
  ) {
    this.snackBar = snackBar;
    this.registerForm = this.fb.group<RegisterForm>({
      card: this.fb.control<string | null>(null, [Validators.required, Validators.min(1), Validators.max(9999999999)]),
      idCompetition: this.fb.control('', [Validators.required]),
      idGroup: this.fb.control('', [Validators.required]),
      Clave_Grupo: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadCompetitions();
    this.loadGroups();
  }

  loadCompetitions() {
    this.competitionsService.getCompetitionsCombo().subscribe(data => {
      this.competitions = data;
    });
  }

  loadGroups() {
    this.groupsService.getGroupsCombo().subscribe(data => {
      this.groups = data;
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { card, idCompetition, idGroup, Clave_Grupo } = this.registerForm.value;

      if (card !== null && idCompetition !== null && idGroup !== null && Clave_Grupo !== null) {
        // Primero asignamos el participante al grupo con la clave del grupo
        this.groupsService.assignGroup(Number(idGroup), String(card), String(Clave_Grupo)).subscribe(
          response => {
            console.log('Grupo asignado correctamente', response);

            // Luego asignamos el concurso al grupo
            this.competitionsService.assignCompetition(Number(idCompetition), Number(idGroup)).subscribe(
              response => {
                this.snackBar.open('Concurso asignado correctamente', 'Cerrar', { duration: 3000 });
              },
              error => {
                console.error('Error al asignar el concurso', error);
                this.snackBar.open('Error al asignar el concurso, inténtelo nuevamente', 'Cerrar', { duration: 3000 });
              }
            );
          },
          error => {
            console.error('Error al asignar el grupo', error);
            this.snackBar.open('Error al asignar el grupo, inténtelo nuevamente', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.snackBar.open('Algunos valores son inválidos.', 'Cerrar', { duration: 3000 });
      }
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
    if (control?.hasError('min')) {
      return 'La cédula debe ser un número entero positivo';
    }
    if (control?.hasError('max')) {
      return 'La cédula no puede tener más de 10 dígitos';
    }
    return '';
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      card: 'Cédula',
      idCompetition: 'Concurso',
      idGroup: 'Grupo',
      Clave_Grupo: 'Clave'
    };
    return fieldNames[key] || key;
  }

  regresar() {
    this.router.navigate(['/']);
  }
}
