import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineAddComponent } from './medicine-add/medicine-add.component';
import { MedicineEditComponent } from './medicine-edit/medicine-edit.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MedicineRoutingModule } from './medicine-routing.module';
import { FormsModule } from '@angular/forms';
import { MedicinePurchaseComponent } from './medicine-purchase/medicine-purchase.component';



@NgModule({
  declarations: [
    MedicineListComponent,
    MedicineAddComponent,
    MedicineEditComponent,
    MedicineDetailsComponent,
    MedicinePurchaseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MedicineRoutingModule
  ]
})
export class MedicineModule { }
