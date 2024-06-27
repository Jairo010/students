import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TalksService } from '../services/api_serivices/talks/talks.service';

export interface ITalks {
  id?: number;
  topic: string;
  image: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

@Component({
  selector: 'app-talks-edit-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './talks-edit-form.component.html',
  styleUrls: ['./talks-edit-form.component.css']
})
export class TalksEditFormComponent implements OnInit {
  title: string = "";
  group!: FormGroup;
  talksService = inject(TalksService);

  constructor(
    private reference: MatDialogRef<TalksEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITalks
  ) {
    this.title = data ? "EDITAR" : "NUEVO";
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl({ value: this.data?.id, disabled: true }),
      topic: new FormControl(this.data?.topic, Validators.required),
      image: new FormControl(this.data?.image, Validators.required),
      startDate: new FormControl(this.data?.startDate, Validators.required),
      endDate: new FormControl(this.data?.endDate, Validators.required),
      status: new FormControl(this.data?.status, Validators.required)
    });
  }

  save() {
    const record = this.group.getRawValue(); 
    this.talksService.updateTalk(record).subscribe(
      response => {
        console.log('Charla actualizada con éxito', response);
        this.reference.close(record);
      },
      error => {
        console.error('Error al actualizar charla', error);
      }
    );
  }

  closeForm() {
    this.reference.close();
  }
}
