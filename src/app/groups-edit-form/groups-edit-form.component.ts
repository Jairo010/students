import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsService } from '../services/api_serivices/groups/groups.service';

export interface IGroups {
  id?: number;
  name: string;
  description: string;
  status: boolean;
}

@Component({
  selector: 'app-group-edit-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './groups-edit-form.component.html',
  styleUrl: './groups-edit-form.component.css'
})
export class GroupsEditFormComponent implements OnInit {
  title: string = "";
  groupForm!: FormGroup;

  constructor(
    private reference: MatDialogRef<GroupsEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGroups,
    private groupsService: GroupsService
  ) {
    this.title = data ? "Editar" : "NUEVO";
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.groupForm = new FormGroup({
      id: new FormControl(this.data?.id),
      name: new FormControl(this.data?.name, Validators.required),
      description: new FormControl(this.data?.description, Validators.required),
      status: new FormControl(this.data?.status, Validators.required),
    });
  }

  save() {
    if (this.groupForm.valid) {
      const group = this.groupForm.value;
      if (group.id) {
        this.groupsService.updateGroup(group).subscribe(() => this.reference.close(group));
      } else {
        this.groupsService.createGroup(group).subscribe(() => this.reference.close(group));
      }
    }
  }

  closeForm() {
    this.reference.close();
  }
}
