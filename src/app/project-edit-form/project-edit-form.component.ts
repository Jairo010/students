import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogContainer, MatDialogModule } from '@angular/material/dialog';
import { ProjectsService } from '../services/api_serivices/projects/projects.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ClubsService } from '../services/api_serivices/clubs/clubs.service';

export interface IProjectData {
  id?: string;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  Club: string;
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
    @Inject(MAT_DIALOG_DATA) public data: IProjectData  ) {
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
      startDate: new FormControl(this.data?.dateStart, Validators.required),
      endDate: new FormControl(this.data?.dateEnd, Validators.required),
      Club: new FormControl(this.data?.Club, Validators.required),
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
