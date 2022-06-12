import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineAddComponent } from './medicine-add/medicine-add.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MedicineUpdateComponent } from './medicine-update/medicine-update.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: MedicineListComponent},
  {path: 'add', component: MedicineAddComponent},
  {path: 'details/:id', component: MedicineDetailsComponent },
  {path: 'update/:id', component: MedicineUpdateComponent}
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class MedicineRoutingModule { }
