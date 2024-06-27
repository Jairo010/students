import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { environment } from '../../environments/environment.development';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { IParticipants } from '../interfaces/participants.interface';
import { ParticipantsService } from '../services/api_serivices/participants/participants.service';
import { ParticipantsEditFormComponent } from '../participants-edit-form/participants-edit-form.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-participants',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatPaginator
  ],
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.css']
})
export class ListParticipantsComponent implements OnInit {
  private participantsService = inject(ParticipantsService);

  data: any = [];
  pageSize = 2;
  pageIndex = 2;
  totalCompetition = 0;
  totalTalks = 0;

  MetaDataColumn: MetaDataColumn[] = [
    { field: 'card', title: 'Cedula' },
    { field: 'name', title: 'Nombre del Participante' },
    { field: 'lastName', title: 'Apellido del Participante' },
    { field: 'email', title: 'Correo' },
    { field: 'status', title: 'Estado' },
  ];


  ngOnInit(): void {
    this.loadParticipants();
  }

  records: any = [];
  totalRecords = this.records.length;
  field: any[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  loadParticipants() {
    this.participantsService.getParticimapts().subscribe(
      (data) => {
        this.records = data.data;
        this.records.forEach((participant: any) => {
          this.field.push({
            card: participant.Cedula_Participante,
            name: participant.Nombre_Participante,
            lastName:participant.Apellido_Participante,
            email:participant.Correo_Participante,
            document:participant.Documento_Habilitante,
            idUniversity:participant.Id_Universidad,
            status: participant.Habilitado_Participante
            
          });
        });
        this.totalRecords = this.records.length;
        this.changePage(0);
      },
      (error) => {
        console.error('Error al cargar los participantes:', error);
      }
    );
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.field.slice(skip, skip + pageSize);
  }

  openForm(row: IParticipants | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };

    const dialogRef: MatDialogRef<ParticipantsEditFormComponent> = this.dialog.open(ParticipantsEditFormComponent, options);

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) { return; }
      console.log(response)
      if (response.card) {
        const participantData = { ...response };
        this.participantsService.updateParticipant(participantData).subscribe(() => {
          this.snackBar.open('Participante actualizado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.reloadPage();
        }, (error) => {
          console.error('Error al actualizar el participante:', error);
        });
      }
    });
  }

  delete(id: number) {
    if (confirm("¿Está seguro de eliminar este participante?")) {
      this.participantsService.deleteParticipant(id.toString()).subscribe(() => {
        this.snackBar.open('Participante eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.reloadPage();
      }, (error) => {
        console.error('Error al eliminar el participante:', error);
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
