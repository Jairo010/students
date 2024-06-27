import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { CommonModule } from '@angular/common';

export interface ICompetitionData {
  id?: string;
  type: string;
  numParticipants: number;
  price: number;
  status: string;
}

@Component({
  selector: 'app-competitions-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './competitions-edit-form.component.html',
  styleUrls: ['./competitions-edit-form.component.css']
})
export class CompetitionsEditFormComponent implements OnInit {
  formVisible = true;
  title: string = "";
  group!: FormGroup;

  constructor(
    private reference: MatDialogRef<CompetitionsEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICompetitionData,
    private competitionsService: CompetitionsService
  ) {
    this.title = data ? "EDITAR" : "NUEVO";
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl(this.data?.id),
      type: new FormControl(this.data?.type, Validators.required),
      numParticipants: new FormControl(this.data?.numParticipants, Validators.required),
      price: new FormControl(this.data?.price, Validators.required),
      status: new FormControl(this.data?.status, Validators.required),
    });
  }

  save() {
    const record = this.group.value;
    this.reference.close(record);
  }

  closeForm() {
    this.reference.close();
  }
}
