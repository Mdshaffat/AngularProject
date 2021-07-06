import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MaterialModule } from '../Shared/material/material.module';
import { SharedModule } from '../Shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AccountRoutingModule

  ]
})
export class AccountModule { }
