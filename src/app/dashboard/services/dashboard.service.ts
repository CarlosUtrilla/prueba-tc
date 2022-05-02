import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import {
  Client,
  SelectedClient,
  SavingAccount,
  SavingAccountWithOutId,
} from '../interfaces/interfaces';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _apiUrl = environment.api;
  private _token: string = '';

  private clients$ = new BehaviorSubject<Client[]>([]);
  private selectedClient$ = new BehaviorSubject<SelectedClient | undefined>(
    undefined
  );

  constructor(private http: HttpClient, private authService: AuthService) {
    this._token = this.authService.getToken();
  }

  private parseUrl(endp: string) {
    return `${this._apiUrl}/${endp}/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json?auth=${this._token}`;
  }

  private setClients() {
    const url = this.parseUrl('clientes');

    return this.http.get(url).subscribe((res: any) => {
      if (!res || res.error) {
        this.clients$.next([]);
      }
      this.clients$.next(Object.values<Client>(res));
    });
  }
  getClients() {
    console.log('getting clients');
    if (this.clients$.getValue().length === 0) {
      this.setClients();
    }
    return this.clients$;
  }

  setSelectedClient(client: Client) {
    this.getSavingAccounts(client.id).subscribe(savingAccounts => {
      this.selectedClient$.next({ client, savingAccounts });
    });
  }
  getSelectedClient() {
    return this.selectedClient$;
  }

  addClient(newClient: Client) {
    const url = this.parseUrl('clientes');
    return this.http.post(url, newClient).pipe(
      map((res: any) => {
        let error = false;
        if (!res || res.error) {
          error = true;
        }
        !error && this.setClients();
        return error;
      })
    );
  }

  getSavingAccounts(id: string) {
    const url = this.parseUrl('cuentaAhorro');

    return this.http.get(url).pipe(
      map((res: any) => {
        if (!res || res.error) {
          return [];
        }
        return Object.entries<SavingAccountWithOutId>(res)
          .map<SavingAccount>(([key, value]) => {
            return { ...value, id: key };
          })
          .filter(s => s.idCliente === id);
      })
    );
  }

  addNewAccount(
    newAccount: SavingAccountWithOutId,
    selectedClient: SelectedClient
  ) {
    const url = this.parseUrl('cuentaAhorro');
    return this.http.post(url, newAccount).pipe(
      map((res: any) => {
        let error = false;
        if (!res || !res.name || res.error) {
          error = true;
        }
        if (!error) {
          this.setSelectedClient(selectedClient.client);
        }
        return error;
      })
    );
  }
}
