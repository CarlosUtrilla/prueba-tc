export interface Client {
  id: string;
  nombre: string;
  direccion: string;
  edad: number;
  genero: 'Masculino' | 'Femenino';
}
export interface SavingAccount {
  estado: string;
  fechaUltimaAct: Date;
  idCliente: string;
  numeroCuenta: string;
  saldo: number;
  id: string;
}
export type SavingAccountWithOutId = Omit<SavingAccount, 'id'>;

export interface SelectedClient {
  client: Client;
  savingAccounts: SavingAccount[];
}
