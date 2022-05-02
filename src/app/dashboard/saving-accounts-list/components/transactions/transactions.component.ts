import { Component, Input } from '@angular/core';
import { SavingAccount, SelectedClient } from '../../../interfaces/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  @Input() accout: SavingAccount | undefined;
  options = [
    { label: 'Deposito', value: 'deposit' },
    { label: 'Retiro', value: 'withdraw' },
  ];
  selectedClient!: SelectedClient | undefined;
  transactionForm = this.fb.group({
    tipo: ['deposit'],
    monto: [0, [Validators.required, Validators.min(0)]],
    numeroCuenta: [0, [Validators.required]],
    terminal: ['TERM235'],
  });

  constructor(private fb: FormBuilder, dbService: DashboardService) {
    dbService.getSelectedClient().subscribe(selectedClient => {
      this.selectedClient = selectedClient;
    });
  }
  onOptionClick() {
    if (this.transactionForm.get('tipo')?.value === 'withdraw') {
      const monto = this.transactionForm.get('monto')?.value;
      const maxMonto = this.accout!.saldo;
      if (monto > maxMonto) {
        this.transactionForm.get('monto')?.setValue(this.accout!.saldo);
      }
    }
  }
  getMountBeforeTransaction() {
    const monto = this.transactionForm.get('monto')?.value;
    const saldo = this.accout?.saldo;
    if (saldo && monto) {
      return this.transactionForm.get('tipo')?.value === 'withdraw'
        ? saldo - monto
        : saldo + monto;
    } else {
      return 0;
    }
  }
  getMaxMount(): number {
    return this.transactionForm.get('tipo')?.value === 'withdraw'
      ? this.accout!.saldo
      : 20000;
  }
  getLabel() {
    return this.transactionForm.get('tipo')?.value === 'deposit'
      ? 'Depositar'
      : 'Retirar';
  }
  transaction() {
    console.log(this.transactionForm.value);
  }
}
