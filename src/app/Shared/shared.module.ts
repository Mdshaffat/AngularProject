import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { TitleComponent } from './component/title/title.component';
import { FooterForAllComponent } from './component/footer-for-all/footer-for-all.component';
import { FrontDialogComponent } from './component/front-dialog/front-dialog.component';

const sharedModule = [
ReactiveFormsModule,
FormsModule
];

@NgModule({
  declarations: [
    TitleComponent,
    FooterForAllComponent,
    FrontDialogComponent
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
    ToastrModule,
    TitleComponent,
    FooterForAllComponent
  ]
})
export class SharedModule { }
