import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { ClientsComponent } from './clients/clients.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { PanelComponent } from './panel/panel.component';
import { CalculeTotalPipe } from './pipes/calcule-total.pipe';
import { SavingAccountsListComponent } from './saving-accounts-list/saving-accounts-list.component';
import { FormClietComponent } from './clients/components/form-cliet/form-cliet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormNewAccoutComponent } from './saving-accounts-list/components/form-new-accout/form-new-accout.component';
import { TransactionsComponent } from './saving-accounts-list/components/transactions/transactions.component';
import { TableTransactionsComponent } from './saving-accounts-list/components/table-transactions/table-transactions.component';

@NgModule({
  declarations: [
    MainComponent,
    ClientsComponent,
    PanelComponent,
    CalculeTotalPipe,
    SavingAccountsListComponent,
    FormClietComponent,
    FormNewAccoutComponent,
    TransactionsComponent,
    TableTransactionsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
