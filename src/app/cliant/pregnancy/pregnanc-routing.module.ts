import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PregnancyAddComponent } from './pregnancy-add/pregnancy-add.component';
import { PregnancyListComponent } from './pregnancy-list/pregnancy-list.component';
import { PregnancyDetailsComponent } from './pregnancy-details/pregnancy-details.component';
import { BranchWisePregnincyListComponent } from './branch-wise-pregnincy-list/branch-wise-pregnincy-list.component';
import { TodaysListComponent } from './todays-list/todays-list.component';
const routes: Routes = [
  {path: '', component: PregnancyListComponent, children: [
    {path: 'branchwiselist', component: BranchWisePregnincyListComponent},
    {path: 'todayslist', component: TodaysListComponent},
  ]},
  {path: 'add', component: PregnancyAddComponent},
  {path: 'details/:id', component: PregnancyDetailsComponent },
  {path: 'update/:id', component: PregnancyAddComponent},
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
export class PregnancRoutingModule { }
