import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Client } from '../interfaces/interfaces';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  clients: Client[] = [];

  displayModal: boolean = false;
  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getClients().subscribe(res => {
      this.clients = res;
    });
  }

  onClientSelected(event: any) {
    const selected: Client = event.value[0];
    this.dashboardService.setSelectedClient(selected);
  }

  switchModal(value: boolean) {
    this.displayModal = value;
  }
}
