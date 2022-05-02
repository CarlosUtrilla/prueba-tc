import { Pipe, PipeTransform } from '@angular/core';
import { SavingAccount } from '../interfaces/interfaces';

@Pipe({
  name: 'calculeTotal',
})
export class CalculeTotalPipe implements PipeTransform {
  transform(acounts: SavingAccount[]): number {
    return acounts.reduce((total, acount) => total + acount.saldo, 0);
  }
}
