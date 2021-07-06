import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './cliant/home/home.component';
import { AuthGuard } from './core/gurd/auth.guard';
import { AdminGuard } from './core/gurd/admin.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./cliant/cliant.module').then(m => m.CliantModule),
                                          canActivate: [AuthGuard]},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'admin',
      canActivate: [AuthGuard, AdminGuard],
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
