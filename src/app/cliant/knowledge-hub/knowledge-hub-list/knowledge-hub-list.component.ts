import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KnowledgeHubViewComponent } from '../knowledge-hub-view/knowledge-hub-view.component';

@Component({
  selector: 'app-knowledge-hub-list',
  templateUrl: './knowledge-hub-list.component.html',
  styleUrls: ['./knowledge-hub-list.component.css']
})
export class KnowledgeHubListComponent implements OnInit {

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(KnowledgeHubViewComponent, {
      data: {
        name: 'https://outreachforall-my.sharepoint.com/personal/admin_outreachforall_org/_layouts/15/Doc.aspx?sourcedoc={53cffec7-d7ff-48a8-a4ac-2984afbbbf3c}&amp;action=embedview&amp;wdAr=1.7777777777777777',
      },
    });
  }
}
