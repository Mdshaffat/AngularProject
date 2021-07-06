import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CliantComponent } from './cliant.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home'},
  {path: '', component: CliantComponent,
        children: [
            {path: 'home', component: HomeComponent},
          ]
  }
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
export class CliantRoutingModule { }
