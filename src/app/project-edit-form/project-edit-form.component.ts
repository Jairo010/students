import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogContainer, MatDialogModule } from '@angular/material/dialog';
import { ProjectsService } from '../services/api_serivices/projects/projects.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ClubsService } from '../services/api_serivices/clubs/clubs.service';
import { IProjects } from '../interfaces/projects.interface';

export interface IProjectDatat {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  idClub: string;
}

@Component({
  selector: 'app-project-edit-form',
  standalone: true,
  imports: [FormsModule, 
    ReactiveFormsModule,MatIconModule,MatLabel,MatFormFieldModule,MatDialogModule,MatToolbarModule,CommonModule],
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.css']
})
export class ProjectEditFormComponent implements OnInit {
  title: string = "";
  group!: FormGroup;
  clubs = inject(ClubsService)
  clubsData: any[] = [];

  constructor(
    private reference: MatDialogRef<ProjectEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProjects  ) {
    this.title = data && data.id ? "EDITAR" : "NUEVO";
  }

  ngOnInit(): void {
    this.loadForm();
    this.getClubs();
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl(this.data?.id),
      name: new FormControl(this.data?.name, Validators.required),
      description: new FormControl(this.data?.description, Validators.required),
      startDate: new FormControl(this.data?.startDate, Validators.required),
      endDate: new FormControl(this.data?.endDate, Validators.required),
      idClub: new FormControl(this.data?.idClub, Validators.required),
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
    this.clubs.getClubsCombo().subscribe(
      response => {
        this.clubsData = response;
        console.log('Clubs data:', this.clubsData);
      },
      error => {
        console.error('Error al obtener los clubs', error);
      }
    );
  }
}
