import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistEntryAddComponent } from './vist-entry-add/vist-entry-add.component';
import { VistEntryListComponent } from './vist-entry-list/vist-entry-list.component';
import { VistEntryEditComponent } from './vist-entry-edit/vist-entry-edit.component';
import { VistEntryStatusUpdateComponent } from './vist-entry-status-update/vist-entry-status-update.component';
import { VistEntryTodaysListComponent } from './vist-entry-todays-list/vist-entry-todays-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { VisitEntryRoutingModule } from './visit-entry-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { VistEntryComponent } from './vist-entry.component';



@NgModule({
  declarations: [
    VistEntryAddComponent,
    VistEntryListComponent,
    VistEntryEditComponent,
    VistEntryStatusUpdateComponent,
    VistEntryTodaysListComponent,
    VistEntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    VisitEntryRoutingModule
  ]
})
export class VisitEntryModule { }
