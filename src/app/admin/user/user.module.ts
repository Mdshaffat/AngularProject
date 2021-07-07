import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserAddComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UserModule { }
