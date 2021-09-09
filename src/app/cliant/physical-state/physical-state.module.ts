import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalStateAddComponent } from './physical-state-add/physical-state-add.component';
import { PhysicalStateEditComponent } from './physical-state-edit/physical-state-edit.component';
import { PhysicalStateDetailsComponent } from './physical-state-details/physical-state-details.component';
import { PhysicalStateListComponent } from './physical-state-list/physical-state-list.component';
import { PhysicalStateRoutingModule } from './physical-state-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';



@NgModule({
  declarations: [
    PhysicalStateAddComponent,
    PhysicalStateEditComponent,
    PhysicalStateDetailsComponent,
    PhysicalStateListComponent
  ],
  imports: [
    CommonModule,
    PhysicalStateRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class PhysicalStateModule { }
