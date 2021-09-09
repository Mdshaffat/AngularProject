import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard'},
  {path: '', component: AdminComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'user', loadChildren: () => import('./user/user.module')
                                    .then(m => m.UserModule)},
      {path: 'hospital', loadChildren: () => import('./hospital/hospital.module')
                                    .then(m => m.HospitalModule)},
      {path: 'membershipbranch', loadChildren: () => import('./membership-branch/membership-branch.module')
                                    .then(m => m.MembershipBranchModule)},
      {path: 'visitEntries', loadChildren: () => import('./visit-entry/visit-entry.module')
                                    .then(m => m.VisitEntryModule)},
    ],
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
