import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineAddComponent } from './medicine-add/medicine-add.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MedicineEditComponent } from './medicine-edit/medicine-edit.component';
import { MedicinePurchaseComponent } from './medicine-purchase/medicine-purchase.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: MedicineListComponent},
  {path: 'add', component: MedicineAddComponent},
  {path: 'details/:id', component: MedicineDetailsComponent},
  {path: 'edit/:id', component: MedicineEditComponent},
  {path: 'purchase', component: MedicinePurchaseComponent},
  {path: 'purchase/:prescriptionid', component: MedicinePurchaseComponent},
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
export class MedicineRoutingModule { }
