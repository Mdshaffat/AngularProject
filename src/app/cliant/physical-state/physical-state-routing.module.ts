import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysicalStateAddComponent } from './physical-state-add/physical-state-add.component';
import { PhysicalStateDetailsComponent } from './physical-state-details/physical-state-details.component';
import { PhysicalStateEditComponent } from './physical-state-edit/physical-state-edit.component';
import { PhysicalStateListComponent } from './physical-state-list/physical-state-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: PhysicalStateListComponent},
  {path: 'add', component: PhysicalStateAddComponent},
  {path: 'details/:id', component: PhysicalStateDetailsComponent },
  {path: 'edit/:id', component: PhysicalStateEditComponent}
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
export class PhysicalStateRoutingModule { }
