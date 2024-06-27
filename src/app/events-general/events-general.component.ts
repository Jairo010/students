import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Agregar MatSnackBar
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SharedModule } from "../shared/shared.module";
import { EventsService } from '../services/api_serivices/events/events.service';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { TalksService } from '../services/api_serivices/talks/talks.service';
import { ICompetition } from '../interfaces/competition.interface';
import { ITalks } from '../interfaces/talks.interface';

@Component({
  selector: 'app-events-general',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './events-general.component.html',
  styleUrls: ['./events-general.component.css']
})
export class EventsGeneralComponent {
  private eventsService = inject(EventsService);
  private competitionsService = inject(CompetitionsService);
  private talksService = inject(TalksService);

  events: any[] = [];
  selectedEvent: any = null;
  competitions: any[] = [];
  talks: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  allCompetitions: any[] = [];
  allTalks: any[] = [];
  pageSize = 2;
  pageIndex = 2;
  totalCompetition = 0;
  totalTalks = 0;

  selectedCompetitionId: string | null = null;
  selectedTalkId: string | null = null;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.loadEvents();
    this.loadAllCompetitions();
    this.loadAllTalks();
  }

  loadEvents() {
    this.eventsService.getEvents().subscribe(data => {
      this.events = data.data;
    });
  }

  loadAllCompetitions() {
    this.competitionsService.getCompetitions().subscribe(data => {
      this.allCompetitions = data.data;
    });
  }

  loadAllTalks() {
    this.talksService.getTalks().subscribe(data => {
      this.allTalks = data.data;
    });
  }

  onEventChange(event: any) {
    this.selectedEvent = event.value;
    this.loadCompetitions();
    this.loadTalks();
  }

  loadCompetitions() {
    if (this.selectedEvent) {
      this.eventsService.getCompetitionsByEvent(this.selectedEvent.id).subscribe(data => {
        this.competitions = data.data;
        this.totalCompetition = this.competitions.length;
        this.pageIndex = 0;
      });
    }
  }

  loadTalks() {
    if (this.selectedEvent) {
      this.eventsService.getTalksByEvent(this.selectedEvent.id).subscribe(data => {
        this.talks = data.data;
        this.totalTalks = this.talks.length;
        this.pageIndex = 0;
      });
    }
  }

  assignCompetition() {
    if (this.selectedCompetitionId) {
      this.eventsService.assignCompetition(this.selectedEvent.id, this.selectedCompetitionId).subscribe(() => {
        this.snackBar.open('La competencia se agregó correctamente.', 'Cerrar', {
          duration: 3000,
        });
        this.loadCompetitions();
        this.selectedCompetitionId = null;
      });
    }
  }

  assignTalk() {
    if (this.selectedTalkId) {
      this.eventsService.assignTalk(this.selectedEvent.id, this.selectedTalkId).subscribe({
        next: (response) => {
          console.log('Assign talk response: ', response);
          if (response.error) {
            this.snackBar.open(`Error: ${response.data.message}`, 'Cerrar', {
              duration: 3000,
            });
          } else {
            this.snackBar.open('La charla se agregó correctamente.', 'Cerrar', {
              duration: 3000,
            });
            this.loadTalks();
            this.selectedTalkId = null;
          }
        },
        error: (error) => {
          console.error('Assign talk error: ', error);
          this.snackBar.open('Error al asignar la charla, inténtelo nuevamente.', 'Cerrar', {
            duration: 3000,
          });
        }
      });
    }
  }

  deleteAssignedCompetition(idCompetition: string) {
    if (confirm("¿Está seguro de eliminar esta competicion?")) {
      this.eventsService.deleteAssignedCompetition(this.selectedEvent!.id, idCompetition).subscribe(() => {
        this.snackBar.open('Competicion eliminada correctamente.', 'Cerrar', {
          duration: 3000,
        });
        this.loadCompetitions();
      });
    }
  }

  deleteAssignedTalk(idTalk: string) {
    if (confirm("¿Está seguro de eliminar esta charla?")) {
      this.eventsService.deleteAssignedTalk(this.selectedEvent!.id, idTalk).subscribe({
        next: () => {
          this.snackBar.open('Charla eliminada correctamente.', 'Cerrar', {
            duration: 3000,
          });
          this.loadTalks();
        },
        error: (error) => {
          console.error('Error al eliminar la charla:', error);
          this.snackBar.open('Ocurrió un error al eliminar la charla. Por favor, inténtalo de nuevo.', 'Cerrar', {
            duration: 3000,
          });
        }
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }
}
