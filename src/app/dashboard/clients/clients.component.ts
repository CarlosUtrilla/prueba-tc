import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Client } from '../interfaces/interfaces';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  clients: Client[] = [];

  displayModal: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {
    this.dashboardService.getClients().subscribe(res => {
      this.clients = res;
    });
  }

  onClientSelected(event: any) {
    const selected: Client = event.value[0];
    this.dashboardService.setSelectedClient(selected);
    this.closeModal.emit(false);
  }

  switchModal(value: boolean) {
    this.displayModal = value;
  }

  logOut() {
    this.authService.logout();
  }
}
