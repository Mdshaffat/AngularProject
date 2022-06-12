import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { PrescriptionEditComponent } from './prescription-edit/prescription-edit.component';
import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionRoutingModule } from './prescription-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import {NgxPrintModule} from 'ngx-print';
import { PrescriptionPrintComponent } from './prescription-print/prescription-print.component';
import { DiseasesComponent } from './diseases/diseases.component';


@NgModule({
  declarations: [
    PrescriptionListComponent,
    PrescriptionDetailsComponent,
    PrescriptionEditComponent,
    PrescriptionAddComponent,
    PrescriptionPrintComponent,
    DiseasesComponent
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
    SharedModule,
    MaterialModule,
    NgxPrintModule
  ]
})
export class PrescriptionModule { }
