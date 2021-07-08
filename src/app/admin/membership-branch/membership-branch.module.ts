import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipBranchlistComponent } from './membership-branchlist/membership-branchlist.component';
import { MembershipBranchaddComponent } from './membership-branchadd/membership-branchadd.component';
import { MembershipBranchdetailsComponent } from './membership-branchdetails/membership-branchdetails.component';
import { MembershipBrancheditComponent } from './membership-branchedit/membership-branchedit.component';
import { MembershipBranchRoutingModule } from './membership-branch-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';



@NgModule({
  declarations: [
    MembershipBranchlistComponent,
    MembershipBranchaddComponent,
    MembershipBranchdetailsComponent,
    MembershipBrancheditComponent
  ],
  imports: [
    CommonModule,
    MembershipBranchRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class MembershipBranchModule { }
