import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeHubViewComponent } from './knowledge-hub-view/knowledge-hub-view.component';
import { KnowledgeHubListComponent } from './knowledge-hub-list/knowledge-hub-list.component';
import { KnowledgeHubRoutingModule } from './knowledge-hub-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'src/app/app.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';




@NgModule({
  declarations: [
    KnowledgeHubViewComponent,
    KnowledgeHubListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    KnowledgeHubRoutingModule,
    MatButtonModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule
  ]
})
export class KnowledgeHubModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
