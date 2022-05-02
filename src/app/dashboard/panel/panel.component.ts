import { Component, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SelectedClient } from '../interfaces/interfaces';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedClient: SelectedClient | undefined;
  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getSelectedClient().subscribe(client => {
      this.selectedClient = client;
    });
  }
}
