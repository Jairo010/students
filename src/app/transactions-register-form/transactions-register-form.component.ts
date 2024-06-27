import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 
import { TransactionsService } from '../services/api_serivices/transactions/transactions.service';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { GroupsService } from '../services/api_serivices/groups/groups.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './transactions-register-form.component.html',
  styleUrls: ['./transactions-register-form.component.css']
})
export class TransactionsRegisterFormComponent implements OnInit {
    transactionsService = inject(TransactionsService);
    competitionsService = inject(CompetitionsService);
    groupsService = inject(GroupsService);
    router = inject(Router);
    // Agrega MatSnackBar al constructor
    constructor(private snackBar: MatSnackBar) {}
  
    transactionForm = new FormGroup({
      amount: new FormControl<any>('', [Validators.required]),
      typeRegister: new FormControl<any>('', [Validators.required]),
      typeTransaction: new FormControl<any>('', [Validators.required]),
      idCompetition: new FormControl<any>(''),
      idGroup: new FormControl<any>('', [Validators.required]),
      total: new FormControl<any>(null, [Validators.required]), // Cambiado a 'number' esperado
      description: new FormControl<any>('', [Validators.required])
    });

    competitions: any[] = [];
    groups: any[] = [];
  
    ngOnInit() {
      this.loadCompetitions();
      this.loadGroups();
    }

    loadCompetitions() {
      this.competitionsService.getCompetitionsCombo().subscribe(data => {
        this.competitions = data;
      });
    }
  
    loadGroups() {
      this.groupsService.getGroupsCombo().subscribe(data => {
        this.groups = data;
      });
    }
  
    onSubmit() {
      if (this.transactionForm.valid) {
        const transactionData = {
          amount: this.transactionForm.get('amount')?.value,
          typeRegister: this.transactionForm.get('typeRegister')?.value,
          typeTransaction: this.transactionForm.get('typeTransaction')?.value,
          idCompetition: this.transactionForm.get('idCompetition')?.value,
          idGroup: this.transactionForm.get('idGroup')?.value,
          total: this.transactionForm.get('total')?.value,
          description: this.transactionForm.get('description')?.value
        };
          
        this.transactionsService.createTransaction(transactionData).subscribe(
          response => {
            // Utiliza MatSnackBar para mostrar mensaje de éxito
            this.snackBar.open('Transacción registrada con éxito', 'Cerrar', {
              duration: 3000, // Duración del mensaje en milisegundos
            });
            this.router.navigate(['/Transacciones-history']);
          },
          error => {
            // Utiliza MatSnackBar para mostrar mensaje de error
            this.snackBar.open('Error al registrar transacción', 'Cerrar', {
              duration: 3000, // Duración del mensaje en milisegundos
            });
          }
        );
      } else {
        // Utiliza MatSnackBar para mostrar mensaje de formulario inválido
        this.snackBar.open('Formulario inválido', 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos
        });
      }
    }

    getErrorMessage(controlName: string): string {
      const control = this.transactionForm.get(controlName);
      if (control?.hasError('required')) {
        return `El campo ${controlName} es requerido`;
      }
      return '';
    }
}
