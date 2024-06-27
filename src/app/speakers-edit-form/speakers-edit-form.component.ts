import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SpeakersService } from '../services/api_serivices/speakers/speakers.service';

export interface ISpeakers {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  biography: string;
  topic: string;
}

@Component({
  selector: 'app-speakers-edit-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './speakers-edit-form.component.html',
  styleUrls: ['./speakers-edit-form.component.css']
})
export class SpeakersEditFormComponent implements OnInit {
  title: string = "";
  group!: FormGroup;
  speakersService = inject(SpeakersService);

  constructor(
    private reference: MatDialogRef<SpeakersEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISpeakers
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
      lastName: new FormControl(this.data?.lastName, Validators.required),
      email: new FormControl(this.data?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data?.phone, Validators.required),
      biography: new FormControl(this.data?.biography, Validators.required),
      topic: new FormControl(this.data?.topic, Validators.required),
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
