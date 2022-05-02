import { Component, OnChanges, Input } from '@angular/core';
import { SavingAccount, Transaction } from '../../../interfaces/interfaces';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrls: ['./table-transactions.component.scss'],
})
export class TableTransactionsComponent implements OnChanges {
  @Input() account: SavingAccount | undefined;

  transactions: Transaction[] = [];

  cols = [
    { field: 'tipo', header: 'Tipo' },
    { field: 'monto', header: 'Monto' },
    { field: 'fechaUltimaAct', header: 'Fecha de transaccion' },
  ];
  constructor(private dbService: DashboardService) {}
  ngOnChanges() {
    if (this.account?.id) {
      this.dbService
        .getTransactions(this.account.numeroCuenta)
        .then(transactions => {
          this.transactions = transactions;
        });
    }
  }
}
