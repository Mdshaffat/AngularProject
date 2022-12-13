import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSingleBloodCampComponent } from './add-single-blood-camp/add-single-blood-camp.component';
import { AddMultipleBloodCampComponent } from './add-multiple-blood-camp/add-multiple-blood-camp.component';
import { UpdateBloodCampComponent } from './update-blood-camp/update-blood-camp.component';
import { BloodCampListComponent } from './blood-camp-list/blood-camp-list.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BloodCampRoutingModule } from './blood-camp-routing.module';



@NgModule({
  declarations: [
    AddSingleBloodCampComponent,
    AddMultipleBloodCampComponent,
    UpdateBloodCampComponent,
    BloodCampListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    BloodCampRoutingModule
  ]
})
export class BloodCampModule { }
