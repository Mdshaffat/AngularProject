import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-knowledge-hub-view',
  templateUrl: './knowledge-hub-view.component.html',
  styleUrls: ['./knowledge-hub-view.component.css']
})
export class KnowledgeHubViewComponent implements OnInit {
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor( @Inject(MAT_DIALOG_DATA) public data: Data ) { }

  ngOnInit(): void {
  }

}
