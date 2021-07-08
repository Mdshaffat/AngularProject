import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MembershipBranchlistComponent } from './membership-branchlist/membership-branchlist.component';
import { MembershipBranchaddComponent } from './membership-branchadd/membership-branchadd.component';
import { MembershipBranchdetailsComponent } from './membership-branchdetails/membership-branchdetails.component';
import { MembershipBrancheditComponent } from './membership-branchedit/membership-branchedit.component';



const routes: Routes = [
  {path: '', redirectTo: 'branches'},
  {path: 'branches', component: MembershipBranchlistComponent},
  {path: 'add', component: MembershipBranchaddComponent},
  {path: 'details/:id', component: MembershipBranchdetailsComponent },
  {path: 'edit/:id', component: MembershipBrancheditComponent}
  ];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class MembershipBranchRoutingModule { }
