import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';

const sharedModule = [
ReactiveFormsModule,
FormsModule
];

@NgModule({
  declarations: [
  ],
  providers: [
    {provide: ToastrService, useClass: ToastrService}
  ],
  imports: [
    sharedModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MaterialModule
  ],
  exports: [
    sharedModule,
    ToastrModule
  ]
})
export class SharedModule { }
