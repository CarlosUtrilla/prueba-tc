import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  SavingAccount,
  SelectedClient,
  Transaction,
} from '../../../interfaces/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  @Input() accout: SavingAccount | undefined;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  options = [
    { label: 'Deposito', value: 'deposit' },
    { label: 'Retiro', value: 'withdraw' },
  ];
  selectedClient!: SelectedClient | undefined;
  transactionForm = this.fb.group({
    tipo: ['deposit'],
    monto: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder, private dbService: DashboardService) {
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
    const { tipo, monto, terminal } = this.transactionForm.value;
    if (monto > 0) {
      const transaction: Transaction = {
        tipo,
        monto,
        terminal,
        numeroCuenta: this.accout!.numeroCuenta,
        fechaUltimaAct: new Date(),
        usuario: this.selectedClient!.client.id,
      };
      this.dbService
        .createTransaction(transaction, this.accout!, this.selectedClient!)
        .then(err => {
          if (!err) {
            this.closeModal.emit(false);
            this.transactionForm.setValue({
              monto: 0,
              tipo: 'deposit',
            });
          }
        });
    } else {
      this.closeModal.emit(false);
    }
  }
}
