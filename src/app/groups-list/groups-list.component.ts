import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { environment } from '../../environments/environment.development';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { IGroups } from '../interfaces/groups.interface';
import { GroupsService } from '../services/api_serivices/groups/groups.service';
import { GroupsEditFormComponent } from '../groups-edit-form/groups-edit-form.component';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit{
  private groupsService = inject(GroupsService);

  data: any = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'actions'];

  MetaDataColumn: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Nombre del Grupo' },
    { field: 'description', title: 'Descripción' },
    { field: 'status', title: 'Habilitado' },
    
  ];

  ngOnInit(): void {
      this.loadGroups();
  }

  records: any = [];
  totalRecords = this.records.length;
  field: any[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.loadGroups();
  }

  loadGroups() {
    this.groupsService.getGroups().subscribe(
      (data) => {
        this.records = data.data;
        this.records.forEach((group: any) => {
          this.field.push({
            id: group.Id_Grupo,
            name: group.Nombre_Grupo,
            description: group.Descripcion_Grupo,
            status: group.Habilitado_Grupo ? 'Sí' : 'No'
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

  openForm(row: IGroups | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };

    const dialogRef: MatDialogRef<GroupsEditFormComponent> = this.dialog.open(GroupsEditFormComponent, options);

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response.id) {
        const groupData = { ...response };
        this.groupsService.updateGroup(groupData).subscribe(() => {
          this.snackBar.open('Grupo actualizado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.reloadPage();
        });
      }
    });
  }

  delete(id: number) {
    if (confirm("¿Está seguro de eliminar este grupo?")) {
      this.groupsService.deleteGroup!(id.toString()).subscribe(() => {
        this.snackBar.open('Grupo eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.reloadPage();
      }, (error) => {
        console.error('Error al eliminar el grupo:', error);
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
