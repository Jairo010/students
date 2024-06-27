import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TransactionsService } from '../services/api_serivices/transactions/transactions.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { GroupsService } from '../services/api_serivices/groups/groups.service';

export interface ITransactionData {
  id?: string;
  amount: number;
  typeRegister: string;
  typeTransaction: string;
  idCompetition: string;
  idGroup: string;
  total: number;
  description: string;
}

@Component({
  selector: 'app-transaction-edit-form',
  standalone:true,
  imports: [FormsModule, 
    ReactiveFormsModule,MatIconModule,MatLabel,MatFormFieldModule,MatDialogModule,MatToolbarModule,CommonModule],
  templateUrl: './transaction-edit-form.component.html',
  styleUrls: ['./transaction-edit-form.component.css']
})
export class TransactionEditFormComponent implements OnInit {
  formVisible = true;
  title: string = '';
  transactionForm!: FormGroup;
  competitionsService = inject(CompetitionsService);
  groupsService = inject(GroupsService);
  competitions: any[] = [];
    groups: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<TransactionEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITransactionData,
    private transactionsService: TransactionsService
  ) {
    this.title = data ? 'EDITAR' : 'NUEVO';
  }

  ngOnInit(): void {
    this.loadForm();
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

  loadForm() {
    this.transactionForm = new FormGroup({
      id: new FormControl(this.data?.id),
      amount: new FormControl(this.data?.amount, Validators.required),
      typeRegister: new FormControl(this.data?.typeRegister, Validators.required),
      typeTransaction: new FormControl(this.data?.typeTransaction, Validators.required),
      idCompetition: new FormControl(this.data?.idCompetition, Validators.required),
      idGroup: new FormControl(this.data?.idGroup, Validators.required),
      total: new FormControl(this.data?.total, Validators.required),
      description: new FormControl(this.data?.description, Validators.required)
    });
  }

  save() {
    const transactionData = this.transactionForm.value;
    this.transactionsService.updateTransaction(transactionData).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error al guardar la transacción:', error);
      }
    );
  }

  closeForm() {
    this.dialogRef.close();
  }
}
