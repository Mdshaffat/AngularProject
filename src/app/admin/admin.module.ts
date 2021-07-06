import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../Shared/material/material.module';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class AdminModule { }
