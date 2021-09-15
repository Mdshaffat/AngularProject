import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitEntriesAddComponent } from './visit-entries-add/visit-entries-add.component';
import { VisitEntriesEditComponent } from './visit-entries-edit/visit-entries-edit.component';
import { VisitEntriesListComponent } from './visit-entries-list/visit-entries-list.component';
import { VisitEntriesStatusUpdateComponent } from './visit-entries-status-update/visit-entries-status-update.component';
import { VisitEntriesTodayListComponent } from './visit-entries-today-list/visit-entries-today-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { VisitEntriesCliantRoutingModule } from './visit-entries-cliant-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { VisitEntriesCliantComponent } from './visit-entries-cliant.component';



@NgModule({
  declarations: [
    VisitEntriesCliantComponent,
    VisitEntriesAddComponent,
    VisitEntriesEditComponent,
    VisitEntriesListComponent,
    VisitEntriesStatusUpdateComponent,
    VisitEntriesTodayListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    VisitEntriesCliantRoutingModule
  ]
})
export class VisitEntriesCliantModule { }
