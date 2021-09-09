import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientVitalComponent } from './add-patient-vital/add-patient-vital.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';


const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: PatientListComponent},
  {path: 'add', component: PatientAddComponent},
  {path: 'details/:id', component: PatientDetailsComponent},
  {path: 'edit/:id', component: PatientUpdateComponent},
  {path: 'addvital', component: AddPatientVitalComponent},
  {path: 'history', component: PatientHistoryComponent},
  {path: 'history/:id', component: PatientHistoryComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PatientRoutingModule { }
