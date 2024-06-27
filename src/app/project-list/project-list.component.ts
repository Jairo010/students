import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { ProjectsService } from '../services/api_serivices/projects/projects.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectEditFormComponent } from '../project-edit-form/project-edit-form.component';
import { IProjects } from '../interfaces/projects.interface';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SharedModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  private projectsService = inject(ProjectsService);
  private snackBar: MatSnackBar;

  data: any = []

  MetaDataColumn: MetaDataColumn[] = [
    { field: 'id', title: 'Codigo' },
    { field: 'name', title: 'Nombre' },
    { field: 'description', title: 'Descripcion' },
    { field: 'dateStart', title: 'Fecha Inicio' },
    { field: 'dateEnd', title: 'Fecha FIn' },
    { field: 'club', title: 'Club' },
  ]
  records: any = []
  totalRecords = this.records.length

  constructor(private dialog: MatDialog, snackBar: MatSnackBar) {
    this.snackBar = snackBar;
    this.loadProjects()
  }
  
  field: any = [];

  loadProjects() {
    this.projectsService.getProjects().subscribe(
      (data) => {
        this.records = data.data;
        this.records.forEach((dato: any) => {
          this.field.push({
            id: dato.id,
            name: dato.Nombre,
            description: dato.Descripcion,
            dateStart: dato.Fecha_Ini,
            dateEnd: dato.Fecha_Fin,
            club: dato.Id_Club.Nombre
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
 
  openForm(row: IProjects | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };
    const reference: MatDialogRef<ProjectEditFormComponent> = this.dialog.open(ProjectEditFormComponent, options);
    reference.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response.id) {
        const project = { ...response };
        this.projectsService.updateProject(project).subscribe(() => {
          this.snackBar.open('Proyecto actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.reloadPage();
        });
      } 
    });
  }

  delete(id: string) {
    if (confirm("¿Está seguro de eliminar este Proyecto?")) {
      this.projectsService.deleteProject!(id).subscribe(() => {
        this.snackBar.open('Proyecto eliminado exitosamente', 'Cerrar', { duration: 3000 });
        this.reloadPage();
      }, (error) => {
        console.error('Error al eliminar el proyecto:', error);
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
