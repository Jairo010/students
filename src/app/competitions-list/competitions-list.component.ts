import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Agrega MatSnackBar
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from "../shared/shared.module";
import { environment } from '../../environments/environment.development';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { CompetitionsEditFormComponent } from '../competitions-edit-form/competitions-edit-form.component';
import { ICompetition } from '../interfaces/competition.interface';

@Component({
  selector: 'app-competitions-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SharedModule],
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.css']
})
export class CompetitionsListComponent {
  private competitionsService = inject(CompetitionsService);

  data: any = [];

  MetaDataColumn: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'type', title: 'Tipo de Competencia' },
    { field: 'numParticipants', title: 'Número de Participantes' },
    { field: 'price', title: 'Valor de Inscripción' },
    { field: 'status', title: 'Estado' }
  ];

  records: any = [];
  totalRecords = this.records.length;
  field: any[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { // Agrega MatSnackBar al constructor
    this.loadCompetitions();
  }

  loadCompetitions() {
    this.competitionsService.getCompetitions().subscribe(
      (data) => {
        this.records = data.data;
        this.records.forEach((competition: any) => {
          console.log(competition);
          this.field.push({
            id: competition.id,
            type: competition.Tipo_Concurso,
            numParticipants: competition.Num_Max_Integrantes,
            price: competition.Valor_Inscripcion,
            status: competition.Estado
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

  openForm(row: ICompetition | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };

    const dialogRef: MatDialogRef<CompetitionsEditFormComponent> = this.dialog.open(CompetitionsEditFormComponent, options);

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response.id) {
        const competitionData = { ...response };
        this.competitionsService.updateCompetition(competitionData).subscribe(() => {
          this.snackBar.open('Competición actualizada exitosamente.', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
          this.reloadPage();
        });
      }
    });
  }

  delete(id: string) {
    if (confirm("¿Está seguro de eliminar esta Competicion?")) {
      this.competitionsService.deleteCompetition!(id).subscribe(() => {
        this.snackBar.open('Competicion eliminada correctamente.', 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos
        });
        this.reloadPage();
      }, (error) => {
        console.error('Error deleting competition:', error);
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
