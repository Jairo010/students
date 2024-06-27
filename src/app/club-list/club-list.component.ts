import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { SharedModule } from "../shared/shared.module";
import { environment } from '../../environments/environment.development';
import { MetaDataColumn } from '../shared/interfaces/metacolumn.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClubsService } from '../services/api_serivices/clubs/clubs.service';
import { IClub } from '../interfaces/clubs.interface';
import { ClubEditFormComponent } from '../club-edit-form/club-edit-form.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-clubs-list',
    standalone: true,
    templateUrl: './club-list.component.html',
    styleUrls: ['./club-list.component.css'],
    imports: [CommonModule, MatButtonModule, MatIconModule, SharedModule]
})
export class ClubsListComponent {
    private clubsService = inject(ClubsService);

    data: any = []

    MetaDataColumn: MetaDataColumn[] = [
        { field: 'id', title: 'Codigo' },
        { field: 'name', title: 'Nombre del club' },
        { field: 'description', title: 'Descripción' },
        { field: 'cardResponsible', title: 'Cedula responsable' }
    ];

    records: any = [];
    totalRecords = this.records.length;
    field: any[] = [];

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private snackBar: MatSnackBar // Agrega MatSnackBar al constructor
    ) {
        this.loadClubs();
    }

    ngOnInit(): void{
        this.loadClubs();
    }

    loadClubs() {
        this.clubsService.getClubs().subscribe(
            (data) => {
                this.records = data.data;
                this.records.forEach((club: any) => {
                    console.log(club);
                    this.field.push({
                        id: club.id,
                        name: club.Nombre,
                        description: club.Descripcion,
                        cardResponsible: club.cedResponsable
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

    openForm(row: IClub | null = null) {
        const options = {
            panelClass: 'panel-container',
            disableClose: true,
            data: row
        };

        const dialogRef: MatDialogRef<ClubEditFormComponent> = this.dialog.open(ClubEditFormComponent, options);

        dialogRef.afterClosed().subscribe((response) => {
            if (!response) { return; }
            if (response.id) {
                const clubData = { ...response };
                this.clubsService.updateClub(clubData).subscribe(() => {
                    this.snackBar.open('Club actualizado exitosamente', 'Cerrar', {
                        duration: 3000, // Duración del mensaje en milisegundos
                    });
                    this.reloadPage();
                });
            }
        });
    }

    delete(id: string) {
        if (confirm("¿Está seguro de eliminar este Club?")) {
            this.clubsService.deleteClub!(id).subscribe(() => {
                this.snackBar.open('Club eliminado exitosamente', 'Cerrar', {
                    duration: 3000, // Duración del mensaje en milisegundos
                });
                this.reloadPage();
            }, (error) => {
                console.error('Error deleting club:', error);
            });
        }
    }

    reloadPage() {
        window.location.reload();
    }
    
}
