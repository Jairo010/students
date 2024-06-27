import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../services/api_serivices/projects/projects.service';
import { CommonModule } from '@angular/common';

export interface ITasks {
  id?:         number,   
  name:        string;
  description: string;
  limitDate:  Date;
  state:       string;
  evidence:    string;
  idProject:   number;
}

@Component({
  selector: 'app-tasks-edit-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './tasks-edit-form.component.html',
  styleUrls: ['./tasks-edit-form.component.css']
})
export class TasksEditFormComponent implements OnInit {
  title: string = "";
  group!: FormGroup;
  projects = inject(ProjectsService)
  projectData: any [] = [];

  constructor(
    private reference: MatDialogRef<TasksEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITasks
  ) {
    this.title = data ? "EDITAR" : "NUEVO";
  }

  ngOnInit(): void {
    this.loadForm();
    this.getClubs();
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl({ value: this.data?.id, disabled: true }),
      name: new FormControl(this.data?.name, Validators.required),
      description: new FormControl(this.data?.description, Validators.required),
      limitDate: new FormControl(this.data?.limitDate, Validators.required),
      state: new FormControl(this.data?.state, Validators.required),
      evidence: new FormControl(this.data?.evidence, Validators.required),
      idProject: new FormControl(this.data?.idProject, Validators.required),
    });
  }

  save() {
    const record = this.group.getRawValue(); 
    this.reference.close(record);
  }
  closeForm() {
    this.reference.close();
   }

   getClubs() {
    this.projects.getProjectsCombo().subscribe(
      response => {
        this.projectData = response;
        console.log('Clubs data:', this.projectData);
      },
      error => {
        console.error('Error al obtener los clubs', error);
      }
    );
  }  
}
