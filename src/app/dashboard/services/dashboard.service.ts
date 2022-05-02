import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, map } from 'rxjs';
import {
  Client,
  SelectedClient,
  SavingAccount,
  SavingAccountWithOutId,
} from '../interfaces/interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { Transaction } from '../interfaces/interfaces';

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

    return lastValueFrom(this.http.get(url)).then((res: any) => {
      if (!res || res.error) {
        this.clients$.next([]);
      }
      this.clients$.next(Object.values<Client>(res));
    });
  }
  getClients() {
    if (this.clients$.getValue().length === 0) {
      this.setClients();
    }
    return this.clients$;
  }

  setSelectedClient(client: Client) {
    this.getSavingAccounts(client.id).then(savingAccounts => {
      this.selectedClient$.next({ client, savingAccounts });
    });
  }
  getSelectedClient() {
    return this.selectedClient$;
  }

  addClient(newClient: Client) {
    const url = this.parseUrl('clientes');
    return lastValueFrom(
      this.http.post(url, newClient).pipe(
        map((res: any) => {
          let error = false;
          if (!res || res.error) {
            error = true;
          }
          !error && this.setClients();
          return error;
        })
      )
    );
  }

  getSavingAccounts(id: string) {
    const url = this.parseUrl('cuentaAhorro');

    return lastValueFrom(
      this.http.get(url).pipe(
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
      )
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

  updateAccount(account: SavingAccount) {
    const url = this.parseUrl('cuentaAhorro');
    const updatedAccount = {
      [account.id]: {
        estado: account.estado,
        fechaUltimaAct: new Date(),
        idCliente: account.idCliente,
        numeroCuenta: account.numeroCuenta,
        saldo: account.saldo,
      },
    };
    return lastValueFrom(
      this.http.patch(url, updatedAccount).pipe(
        map((res: any) => {
          let error = false;
          if (!res || res.error) {
            error = true;
          }
          return error;
        })
      )
    );
  }
  createTransaction(
    transaction: Transaction,
    selectedAccout: SavingAccount,
    selectedCliet: SelectedClient
  ): Promise<boolean> {
    selectedAccout.saldo =
      transaction.tipo === 'deposit'
        ? selectedAccout.saldo + transaction.monto
        : selectedAccout.saldo - transaction.monto;

    return this.updateAccount(selectedAccout).then(err => {
      if (!err) {
        const url = this.parseUrl('transacciones');
        return lastValueFrom(
          this.http.post(url, transaction).pipe(
            map((res: any) => {
              let error = false;
              if (!res || res.error) {
                error = true;
              }
              if (!error) {
                this.setSelectedClient(selectedCliet.client);
              }
              return error;
            })
          )
        );
      }
      return lastValueFrom(new BehaviorSubject(false));
    });
  }
  getTransactions(numCuenta: string) {
    const url = this.parseUrl('transacciones');
    return lastValueFrom(
      this.http.get(url).pipe(
        map((res: any) => {
          if (!res || res.error) {
            return [];
          }
          return Object.values<Transaction>(res)
            .filter(t => t.numeroCuenta === numCuenta)
            .map(t => ({
              ...t,
              fechaUltimaAct: new Date(t.fechaUltimaAct).toLocaleString(),
              monto: t.tipo === 'deposit' ? t.monto : -t.monto,
              tipo: t.tipo === 'deposit' ? 'Deposito' : 'Retiro',
            }));
        })
      )
    );
  }
}
