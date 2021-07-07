import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
{path: '', redirectTo: 'userlist'},
{path: 'useradd', component: UserAddComponent},
{path: 'userlist', component: UserListComponent},
{path: 'useredit/:id', component: UserEditComponent},
{path: 'userdetails/:id', component: UserDetailsComponent}
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
export class UserRoutingModule { }
