import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SelectedClient, SavingAccount } from '../interfaces/interfaces';

@Component({
  selector: 'app-saving-accounts-list',
  templateUrl: './saving-accounts-list.component.html',
  styleUrls: ['./saving-accounts-list.component.scss'],
})
export class SavingAccountsListComponent {
  selectedClient: SelectedClient | undefined;
  display: boolean = false;
  displayForm: boolean = false;
  displayTable: boolean = false;
  selectedAccount: SavingAccount | undefined;
  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getSelectedClient().subscribe(client => {
      this.selectedClient = client;
    });
  }

  openModal(account: SavingAccount) {
    this.display = true;
    this.selectedAccount = account;
  }
  openTable(account: SavingAccount) {
    this.selectedAccount = account;
    this.displayTable = true;
  }
}
