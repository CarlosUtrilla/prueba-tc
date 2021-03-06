import { NgModule } from '@angular/core';

// Componentes
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
  exports: [
    InputTextModule,
    CarouselModule,
    ButtonModule,
    OrderListModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    DialogModule,
    InputNumberModule,
    SelectButtonModule,
    ToastModule,
    TableModule,
    SidebarModule,
  ],
})
export class PrimeNgModule {}
