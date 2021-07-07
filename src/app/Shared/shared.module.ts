import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
    ToastrModule.forRoot()
  ],
  exports: [
    sharedModule,
    ToastrModule
  ]
})
export class SharedModule { }
