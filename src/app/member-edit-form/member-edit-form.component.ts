import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembersService } from '../services/api_serivices/members/members.service';

export interface IMemberData {
  id?: string;
  card:string;
  name: string;
  lastName: string;
  semester: string;
  idMajor: string;
  idRol: string;
}

@Component({
  selector: 'app-member-edit-form',
  standalone: true,
  imports: [FormsModule, 
    ReactiveFormsModule,],
  templateUrl: './member-edit-form.component.html',
  styleUrls: ['./member-edit-form.component.css']
})
export class MemberEditFormComponent implements OnInit {
  formVisible = true;
  title: string = "";
  group!: FormGroup;

  constructor(
    public reference: MatDialogRef<MemberEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMemberData,
    private membersService: MembersService
  ) {
    this.title = data ? "EDITAR" : "NUEVO";
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl(this.data?.id),
      card: new FormControl(this.data?.card, Validators.required),
      name: new FormControl(this.data?.name, Validators.required),
      lastName: new FormControl(this.data?.lastName, Validators.required),
      semester: new FormControl(this.data?.semester, Validators.required),
      idMajor: new FormControl(this.data?.idMajor, Validators.required),
      idRol: new FormControl(this.data?.idRol, Validators.required),
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
