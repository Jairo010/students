import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventsService } from '../services/api_serivices/events/events.service';

export interface IEvents {
  id?: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  typeEvent: string;
  status: string;
}

@Component({
  selector: 'app-event-edit-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './event-edit-form.component.html',
  styleUrls: ['./event-edit-form.component.css']
})
export class EventEditFormComponent implements OnInit {
  formVisible = true;
  title: string = "";
  group!: FormGroup;

  constructor(
    private reference: MatDialogRef<EventEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvents,
    private eventsService: EventsService
  ) {
    this.title = data ? "Editar" : "NUEVO";
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl(this.data?.id),
      name: new FormControl(this.data?.name, Validators.required),
      description: new FormControl(this.data?.description, Validators.required),
      startDate: new FormControl(this.data?.startDate, Validators.required),
      endDate: new FormControl(this.data?.endDate, Validators.required),
      typeEvent: new FormControl(this.data?.typeEvent, Validators.required),
      status: new FormControl(this.data?.status, Validators.required),
    });
  }

  save() {
    if (this.group.valid) {
      const event = this.group.value;
      if (event.id) {
        this.eventsService.updateEvent(event).subscribe(() => this.reference.close(event));
      } else {
        this.eventsService.createEvent(event).subscribe(() => this.reference.close(event));
      }
    }
  }

  closeForm() {
    this.reference.close();
  }
}
