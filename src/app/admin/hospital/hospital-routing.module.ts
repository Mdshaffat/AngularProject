import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalAddComponent } from './hospital-add/hospital-add.component';
import { HospitalDetailsComponent } from './hospital-details/hospital-details.component';
import { HospitalEditComponent } from './hospital-edit/hospital-edit.component';

const routes: Routes = [
{path: '', redirectTo: 'hospitals'},
{path: 'hospitals', component: HospitalListComponent},
{path: 'add', component: HospitalAddComponent},
{path: 'details', component: HospitalDetailsComponent },
{path: 'edit', component: HospitalEditComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HospitalRoutingModule { }
