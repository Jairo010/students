import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UniversitiesService } from '../services/api_serivices/universities/universities.service';

export interface IUniversities {
  id?: number;
  name: string;
  city: string;
  province: string;
}

@Component({
  selector: 'app-university-edit-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './university-edit-form.component.html',
  styleUrls: ['./university-edit-form.component.css']
})
export class UniversityEditFormComponent implements OnInit {
  title: string = "";
  group!: FormGroup;
  universitiesService = inject(UniversitiesService);

  constructor(
    private reference: MatDialogRef<UniversityEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUniversities
  ) {
    this.title = data ? "EDITAR" : "NUEVO";
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl({ value: this.data?.id, disabled: true }),
      name: new FormControl(this.data?.name, Validators.required),
      city: new FormControl(this.data?.city, Validators.required),
      province: new FormControl(this.data?.province, Validators.required),
    });
  }

  save() {
    const record = this.group.getRawValue(); 
    this.reference.close(record);
  }

  closeForm() {
    this.reference.close();
  }
}
