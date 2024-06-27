import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { ITasks } from '../interfaces/tasks.interface';
import { TasksService } from '../services/api_serivices/tasks/tasks.service';
import { TasksEditFormComponent } from '../tasks-edit-form/tasks-edit-form.component';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { environment } from '../../environments/environment.development';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SharedModule],
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  private tasksService = inject(TasksService);

  data: any = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.loadTasks();
  }

  MetaDataColumn: MetaDataColumn[] = [
    { field: 'id', title: 'Codigo' },
    { field: 'name', title: 'Nombre' },
    { field: 'description', title: 'Descripcion' },
    { field: 'limitDate', title: 'Fecha Limite' },
    { field: 'state', title: 'Estado' },
    { field: 'evidence', title: 'Evidencia' },
    { field: 'project', title: 'Proyecto' },
  ];
  records: any[] = [];
  totalRecords = this.records.length;

  field: any[] = [];

  loadTasks() {
    this.tasksService.getTasks().subscribe(
      (data) => {
        this.records = data.data;
        console.log(this.records);
        this.records.forEach((dato: any) => {

          this.field.push({
            id: dato.id,
            name: dato.Nombre,
            description: dato.Descripcion,
            limitDate: dato.Fecha_Limite,
            state: dato.Estado,
            evidence: dato.Evidencia,
            project: dato.Id_Proyecto.Nombre
          });
        })
        this.totalRecords = this.records.length
        this.changePage(0)

      }
    );
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.field.slice(skip, skip + pageSize)
  }

  openForm(row: ITasks | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };

    const reference: MatDialogRef<TasksEditFormComponent> = this.dialog.open(TasksEditFormComponent, options);

    reference.afterClosed().subscribe((response) => {
      if (!response) { return }
      if (response.id) {
        const task = { ...response }
        this.tasksService.updateTask(task).subscribe(() => {
          console.log("hora: " + JSON.stringify(task))
          this.reloadPage()
        })
      }
    });
  }

  delete(id: string) {
    if (confirm("¿Está seguro de eliminar esta Tarea?")) {
      this.tasksService.deleteTask(id).subscribe(() => {
        this.snackBar.open('Tarea eliminada exitosamente', 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos
        });
        this.reloadPage()
      }, (error) => {
        console.error('Error deleting member:', error);
        this.snackBar.open('Error al eliminar la Tarea', 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos
        });
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
