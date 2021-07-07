import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalAddComponent } from './hospital-add/hospital-add.component';
import { HospitalEditComponent } from './hospital-edit/hospital-edit.component';
import { HospitalDetailsComponent } from './hospital-details/hospital-details.component';
import { HospitalRoutingModule } from './hospital-routing.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    HospitalListComponent,
    HospitalAddComponent,
    HospitalEditComponent,
    HospitalDetailsComponent
  ],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class HospitalModule { }
