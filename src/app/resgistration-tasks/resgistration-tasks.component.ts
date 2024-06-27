import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../services/api_serivices/tasks/tasks.service';
import { ITasks } from '../interfaces/tasks.interface';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { ProjectsService } from '../services/api_serivices/projects/projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resgistration-tasks',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './resgistration-tasks.component.html',
  styleUrls: ['./resgistration-tasks.component.css']
})
export class ResgistrationTasksComponent implements OnInit {
  tasks = inject(TasksService);
  router = inject(Router);
  task: any;
  projectData: any[] = [];
  projects = inject(ProjectsService);
  minStartDate!: string;
  minEndDate!: string;

  // Agrega MatSnackBar al constructor
  constructor(private snackBar: MatSnackBar) {}

  register = new FormGroup({
    name: new FormControl<any>('', [Validators.required]),
    description: new FormControl<any>('', [Validators.required]),
    limitDate: new FormControl<any>('', [Validators.required]),
    state: new FormControl<any>('', [Validators.required]),
    evidence: new FormControl<any>(''),
    idProject: new FormControl<any>('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getProjects();    
      this.minStartDate = new Date().toISOString().split('T')[0];
      this.minEndDate = this.minStartDate;        
  }

  updateEndDateMin() {
    this.minEndDate = this.task.get('limitDate')?.value || this.minStartDate;
  }

  onSubmit() {
    if (this.register.valid) {
      const taskData: ITasks = {
        name: this.register.get('name')?.value,
        description: this.register.get('description')?.value,
        limitDate: this.register.get('limitDate')?.value,
        state: this.register.get('state')?.value,
        evidence: this.register.get('evidence')?.value,
        idProject: this.register.get('idProject')?.value,
      };

      this.tasks.createTasks(taskData).subscribe(
        response => {
          this.task = response;
          // Utiliza MatSnackBar para mostrar mensaje de éxito
          this.snackBar.open('Tarea registrada exitosamente', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          console.log('Tarea registrada exitosamente', response);
          this.router.navigate(['tareas']);
        },
        error => {
          // Utiliza MatSnackBar para mostrar mensaje de error
          this.snackBar.open('Error al registrar la tarea', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          console.error('Error al registrar una tarea', error);
        }
      );
    } else {
      // Utiliza MatSnackBar para mostrar mensaje de formulario inválido
      this.snackBar.open('Formulario inválido', 'Cerrar', {
        duration: 3000, // Duración del mensaje en milisegundos
      });
    }
  }

  getProjects() {
    this.projects.getProjectsCombo().subscribe(
      response => {
        this.projectData = response;
        console.log('Project data:', this.projectData);
      },
      error => {
        console.error('Error al obtener los proyectos', error);
      }
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.register.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
}
