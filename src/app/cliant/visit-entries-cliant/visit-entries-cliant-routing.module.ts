import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitEntriesAddComponent } from './visit-entries-add/visit-entries-add.component';
import { VisitEntriesCliantComponent } from './visit-entries-cliant.component';
import { VisitEntriesListComponent } from './visit-entries-list/visit-entries-list.component';
import { VisitEntriesTodayListComponent } from './visit-entries-today-list/visit-entries-today-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'add', component: VisitEntriesAddComponent},
  {path: '', component: VisitEntriesCliantComponent, children: [
    {path: 'list', component: VisitEntriesListComponent},
    {path: 'todayslist', component: VisitEntriesTodayListComponent }
  ]},
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
export class VisitEntriesCliantRoutingModule { }
