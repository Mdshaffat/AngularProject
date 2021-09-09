import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { AddPatientVitalComponent } from './add-patient-vital/add-patient-vital.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { PatientRoutingModule } from './patient-routing.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { PatientHistoryComponent } from './patient-history/patient-history.component';



@NgModule({
  declarations: [
    PatientAddComponent,
    PatientListComponent,
    PatientDetailsComponent,
    AddPatientVitalComponent,
    PatientUpdateComponent,
    PatientHistoryComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PatientModule { }
