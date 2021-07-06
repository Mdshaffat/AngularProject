import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CliantComponent } from './cliant.component';
import { MaterialModule } from '../Shared/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CliantRoutingModule } from './cliant-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../Shared/shared.module';



@NgModule({
  declarations: [
    CliantComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CliantRoutingModule,
    SharedModule
  ]
})
export class CliantModule { }
