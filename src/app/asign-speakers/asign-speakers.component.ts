import { Component, OnInit } from '@angular/core';
import { TalksService } from '../services/api_serivices/talks/talks.service';
import { SpeakersService } from '../services/api_serivices/speakers/speakers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asign-speakers',
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
  templateUrl: './asign-speakers.component.html',
  styleUrls: ['./asign-speakers.component.css']
})
export class AsignSpeakersComponent implements OnInit {
  talks: any = [];
  selectedTalk: any = null;
  displayedColumns: string[] = ['id', 'name', 'apellido', 'topic', 'actions'];
  speakers: any[] = [];
  allSpeakers: any[] = [];
  selectedSpeakerId: string | null = null;
  loadingSpeakers = false;
  pageIndex = 0;
  pageSize = 10;
  totalSpeakers = 0;

  constructor(
    private talksService: TalksService,
    private speakersService: SpeakersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTalks();
    this.loadSpeakers();
    this.loadAllSpeakers();
  }

  loadTalks() {
    this.talksService.getTalksCombo().subscribe(data => {
      this.talks = data;
    });
  }

  onSelectTalk(event: any) {
    this.selectedTalk = event.value;
    this.loadSpeakers();
  }
  loadAllSpeakers(){
    this.speakersService.getSpeakers().subscribe(data => {
      this.allSpeakers = data.data;
    });
  }

  loadSpeakers() {
    if (this.selectedTalk) {
      this.loadingSpeakers = true;
      this.talksService.getSpeakersByTalk(this.selectedTalk.id_Charla).subscribe(
        data => {
          this.speakers = data.data;
          this.totalSpeakers = this.speakers.length;
          this.loadingSpeakers = false;
        },
        error => {
          console.error('Error loading speakers:', error);
          this.loadingSpeakers = false;
        }
      );
    }
  }

  addSpeaker() {
    if (this.selectedSpeakerId && this.selectedTalk) {
      this.talksService.assignTalk(this.selectedTalk.id_Charla, this.selectedSpeakerId).subscribe(
        () => {
          this.loadSpeakers();
          this.snackBar.open('Ponente agregado correctamente.', 'Cerrar', {
            duration: 3000,
          });
        },
        error => {
          console.error('Error adding speaker:', error);
          this.snackBar.open('Error al agregar el ponente. Por favor, inténtalo de nuevo.', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }

  deleteSpeaker(speakerId: string) {
    if (confirm('¿Está seguro de eliminar este ponente?')) {
      if (this.selectedTalk) {
        this.talksService.deleteAssignedTalk(this.selectedTalk.id_Charla, speakerId).subscribe(
          () => {
            this.loadSpeakers();
            this.snackBar.open('Ponente eliminado correctamente.', 'Cerrar', {
              duration: 3000,
            });
          },
          error => {
            console.error('Error deleting speaker:', error);
            this.snackBar.open('Error al eliminar el ponente. Por favor, inténtalo de nuevo.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    }
  }
}
