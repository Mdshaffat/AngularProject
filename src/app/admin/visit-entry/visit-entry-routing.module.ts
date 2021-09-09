import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistEntryListComponent } from './vist-entry-list/vist-entry-list.component';
import { VistEntryTodaysListComponent } from './vist-entry-todays-list/vist-entry-todays-list.component';
import { VistEntryComponent } from './vist-entry.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: '', component: VistEntryComponent, children: [
    {path: 'list', component: VistEntryListComponent},
    {path: 'todayslist', component: VistEntryTodaysListComponent }
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
export class VisitEntryRoutingModule { }
