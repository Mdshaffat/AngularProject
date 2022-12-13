import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeHubListComponent } from './knowledge-hub-list/knowledge-hub-list.component';
import { KnowledgeHubViewComponent } from './knowledge-hub-view/knowledge-hub-view.component';



const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: KnowledgeHubListComponent},
  {path: 'view/:id', component: KnowledgeHubViewComponent},
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
export class KnowledgeHubRoutingModule { }
