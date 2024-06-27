import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParticipantsService } from '../services/api_serivices/participants/participants.service';
import { IParticipants } from '../interfaces/participants.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participants-edit-form',
  standalone:true,
  imports: [FormsModule, 
    ReactiveFormsModule,MatIconModule,MatLabel,MatFormFieldModule,MatDialogModule,MatToolbarModule,CommonModule],
  templateUrl: './participants-edit-form.component.html',
  styleUrls: ['./participants-edit-form.component.css']
})
export class ParticipantsEditFormComponent implements OnInit {
  participantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private participantsService: ParticipantsService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ParticipantsEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IParticipants
  ) {
    this.participantForm = this.fb.group({
      card: [data ? data.card : '', Validators.required],
      name: [data ? data.name : '', Validators.required],
      lastName: [data ? data.lastName : '', Validators.required],
      email: [data ? data.email : '', [Validators.required, Validators.email]],
      document: [data ? data.document : '', Validators.required],
      idUniversity: [data ? data.idUniversity : '', Validators.required],
      status: [data ? data.status : false, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.participantForm.valid) {
      const updatedParticipant: IParticipants = this.participantForm.value;
      this.dialogRef.close(updatedParticipant);
    } else {
      this.snackBar.open('Por favor complete todos los campos requeridos.', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
