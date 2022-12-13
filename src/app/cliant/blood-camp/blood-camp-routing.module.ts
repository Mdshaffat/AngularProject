import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BloodCampListComponent } from './blood-camp-list/blood-camp-list.component';
import { AddSingleBloodCampComponent } from './add-single-blood-camp/add-single-blood-camp.component';
import { UpdateBloodCampComponent } from './update-blood-camp/update-blood-camp.component';




const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: BloodCampListComponent},
  {path: 'add', component: AddSingleBloodCampComponent},
  {path: 'edit/:id', component: UpdateBloodCampComponent},
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
export class BloodCampRoutingModule { }
