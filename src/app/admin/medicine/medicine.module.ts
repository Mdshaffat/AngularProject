import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineAddComponent } from './medicine-add/medicine-add.component';
import { MedicineUpdateComponent } from './medicine-update/medicine-update.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MedicineRoutingModule } from './medicine-routing.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    MedicineListComponent,
    MedicineAddComponent,
    MedicineUpdateComponent,
    MedicineDetailsComponent
  ],
  imports: [
    CommonModule,
    MedicineRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class MedicineModule { }
