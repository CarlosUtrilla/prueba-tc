import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';
import { User } from '../../../../auth/interfaces/interfaces';
import { Client } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-form-cliet',
  templateUrl: './form-cliet.component.html',
  styleUrls: ['./form-cliet.component.scss'],
})
export class FormClietComponent {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  showError: boolean = false;
  generos = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
  ];
  newClientForm = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    edad: [18, Validators.required],
    genero: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  register() {
    this.showError = true;
    const { nombre, direccion, edad, genero } = this.newClientForm.value;
    if (this.newClientForm.valid) {
      const id: string = (
        this.dashboardService.getClients().getValue().length + 1
      ).toString();

      const newClient: Client = {
        id,
        nombre,
        direccion,
        edad,
        genero,
      };
      this.dashboardService.addClient(newClient).then(err => {
        if (!err) {
          this.closeModal.emit(false);
        }
        return;
      });
    }
  }

  getError(inputName: string) {
    return this.newClientForm.get(inputName)?.errors && this.showError;
  }
}
