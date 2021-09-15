import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CliantComponent } from './cliant.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home'},
  {path: '', component: CliantComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)},
            {path: 'physicalstate', loadChildren: () => import('./physical-state/physical-state.module')
                                    .then(m => m.PhysicalStateModule)},
            {path: 'prescription', loadChildren: () => import('./prescription/prescription.module')
                                    .then(m => m.PrescriptionModule)},
            {path: 'medicine', loadChildren: () => import('./medicine/medicine.module')
                                    .then(m => m.MedicineModule)},
            {path: 'visitentries', loadChildren: () => import('./visit-entries-cliant/visit-entries-cliant.module')
                                    .then(m => m.VisitEntriesCliantModule)},
          ]
  }
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
export class CliantRoutingModule { }
