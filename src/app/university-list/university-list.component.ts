import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { UniversityEditFormComponent } from '../university-edit-form/university-edit-form.component';
import { IUniversities } from '../interfaces/universities.interface';
import { UniversitiesService } from '../services/api_serivices/universities/universities.service';

@Component({
  selector: 'app-university-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SharedModule],
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css']
})
export class UniversityListComponent {
  private universitiesService = inject(UniversitiesService);
  private snackBar: MatSnackBar; // Agrega snackBar

  data: any = [];
  MetaDataColumn: MetaDataColumn[] = [
    { field: 'name', title: 'Nombre' },
    { field: 'city', title: 'Ciudad' },
    { field: 'province', title: 'Provincia' }
  ];
  records: any = [];
  totalRecords = this.records.length;

  constructor(private dialog: MatDialog, snackBar: MatSnackBar) {
    this.snackBar = snackBar; // Asigna snackBar
    this.loadUniversities();
  }

  field: any = [];
  loadUniversities() {
    this.universitiesService.getUniversities().subscribe(
      (data) => {
        this.records = data.data;
        console.log(this.records);
        this.records.forEach((dato: any) => {
          this.field.push({
            id: dato.Id_Universidades,
            name: dato.Nombre_Universidad,
            city: dato.Ciudad_Universidad,
            province: dato.Provincia_Universidad
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

  openForm(row: IUniversities | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };

    const reference = this.dialog.open(UniversityEditFormComponent, options);

    reference.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response.id) {
        const university = { ...response };
        this.universitiesService.updateUniversity(university).subscribe(() => {
          this.snackBar.open('Universidad actualizada exitosamente', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          this.reloadPage();
        });
      } else {
        this.universitiesService.createUniversity(response).subscribe(() => {
          this.snackBar.open('Universidad creada exitosamente', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          this.reloadPage();
        });
      }
    });
  }

  delete(id: string) {
    if (confirm("¿Está seguro de eliminar esta universidad?")) {
      this.universitiesService.deleteUniversity(id).subscribe(() => {
        this.snackBar.open('Universidad eliminada exitosamente', 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos
        });
        this.reloadPage();
      }, (error) => {
        console.error('Error al eliminar la universidad:', error);
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
