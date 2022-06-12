import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  details: HTMLElement | null;
}

@Component({
  selector: 'app-front-dialog',
  templateUrl: './front-dialog.component.html',
  styleUrls: ['./front-dialog.component.css']
})
export class FrontDialogComponent implements OnInit {
  title= this.data.title;
  details = this.data.details;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
