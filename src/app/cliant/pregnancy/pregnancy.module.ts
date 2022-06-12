import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PregnancyAddComponent } from './pregnancy-add/pregnancy-add.component';
import { PregnancyListComponent } from './pregnancy-list/pregnancy-list.component';
import { PregnancRoutingModule } from './pregnanc-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PregnancyDetailsComponent } from './pregnancy-details/pregnancy-details.component';



@NgModule({
  declarations: [
    PregnancyAddComponent,
    PregnancyListComponent,
    PregnancyDetailsComponent
  ],
  imports: [
    CommonModule,
    PregnancRoutingModule,
    SharedModule,
    MaterialModule,
    SweetAlert2Module
  ]
})
export class PregnancyModule { }
