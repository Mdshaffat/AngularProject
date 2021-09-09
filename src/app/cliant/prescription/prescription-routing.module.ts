import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { PrescriptionEditComponent } from './prescription-edit/prescription-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: PrescriptionListComponent},
  {path: 'add', component: PrescriptionAddComponent},
  {path: 'details/:id', component: PrescriptionDetailsComponent },
  {path: 'edit/:id', component: PrescriptionEditComponent}
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
export class PrescriptionRoutingModule { }
