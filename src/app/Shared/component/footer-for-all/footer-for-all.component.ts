import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'footer-for-all',
  templateUrl: './footer-for-all.component.html',
  styleUrls: ['./footer-for-all.component.css']
})
export class FooterForAllComponent implements OnInit {
  @Input() footerName: string;
  constructor() { }

  ngOnInit(): void {
  }

}
