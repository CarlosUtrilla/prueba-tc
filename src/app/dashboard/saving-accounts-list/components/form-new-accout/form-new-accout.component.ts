import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';
import {
  SelectedClient,
  SavingAccountWithOutId,
} from '../../../interfaces/interfaces';

@Component({
  selector: 'app-form-new-accout',
  templateUrl: './form-new-accout.component.html',
  styleUrls: ['./form-new-accout.component.scss'],
})
export class FormNewAccoutComponent {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  selectedClient!: SelectedClient;
  newAccount = this.fb.group({
    saldo: [0, [Validators.required, Validators.min(0)]],
    numeroCuenta: [Date.now(), [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {
    dashboardService.getSelectedClient().subscribe(selectedClient => {
      this.selectedClient = selectedClient!;
    });
  }

  register() {
    const { saldo, numeroCuenta } = this.newAccount.value;
    const newAccount: SavingAccountWithOutId = {
      estado: 'Activa',
      saldo,
      numeroCuenta,
      idCliente: this.selectedClient.client.id,
      fechaUltimaAct: new Date(),
    };
    this.dashboardService
      .addNewAccount(newAccount, this.selectedClient)
      .subscribe(err => {
        if (!err) {
          this.newAccount.reset({
            saldo: 0,
            numeroCuenta: Date.now(),
          });
          this.closeModal.emit(true);
        }
      });
  }
  getError(inputName: string) {
    return this.newAccount.get(inputName)?.errors;
  }
}
