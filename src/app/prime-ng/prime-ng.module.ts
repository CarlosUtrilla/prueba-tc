import { NgModule } from '@angular/core';

// Componentes
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';

@NgModule({
  exports: [
    InputTextModule,
    CarouselModule,
    ButtonModule
  ]
})
export class PrimeNgModule { }
