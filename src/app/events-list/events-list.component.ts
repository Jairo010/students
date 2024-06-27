import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { environment } from '../../environments/environment.development';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { IEvents } from '../interfaces/events.interface';
import { EventEditFormComponent } from '../event-edit-form/event-edit-form.component';
import { EventsService } from '../services/api_serivices/events/events.service';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent {
  private eventsService = inject(EventsService);

  data: any = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'startDate', 'endDate', 'typeEvent', 'actions'];

  MetaDataColumn: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Nombre del Evento' },
    { field: 'description', title: 'Descripción' },
    { field: 'startDate', title: 'Fecha de Inicio' },
    { field: 'endDate', title: 'Fecha de Fin' },
    { field: 'typeEvent', title: 'Tipo de Evento' }
  ];

  records: any = [];
  totalRecords = this.records.length;
  field: any[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getEvents().subscribe(
      (data) => {
        this.records = data.data;
        this.records.forEach((event: any) => {
          this.field.push({
            id: event.id,
            name: event.Nombre,
            description: event.Descripcion,
            startDate: event.Fecha_Ini,
            endDate: event.Fecha_Fin,
            typeEvent: event.Tipo_Evento
          });
        });
        this.totalRecords = this.records.length;
        this.changePage(0);
      }
    );
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.field.slice(skip, skip + pageSize);
  }

  openForm(row: IEvents | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };

    const dialogRef: MatDialogRef<EventEditFormComponent> = this.dialog.open(EventEditFormComponent, options);

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response.id) {
        const eventData = { ...response };
        this.eventsService.updateEvent(eventData).subscribe(() => {
          this.snackBar.open('Evento actualizado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.reloadPage();
        });
      }
    });
  }

  delete(id: number) {
    if (confirm("¿Está seguro de eliminar este Evento?")) {
      this.eventsService.deleteEvent(id).subscribe(() => {
        this.snackBar.open('Evento eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.reloadPage();
      }, (error) => {
        console.error('Error deleting event:', error);
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
