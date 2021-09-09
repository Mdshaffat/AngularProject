import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vist-entry',
  templateUrl: './vist-entry.component.html',
  styleUrls: ['./vist-entry.component.css']
})
export class VistEntryComponent implements OnInit {
  selectedTabIndex = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  allVisit(){
    this.router.navigateByUrl('/admin/visitEntries/list').then(() => {location.reload(); } );
  }
  currentVisit(){
    this.router.navigateByUrl('/admin/visitEntries/todayslist').then(() => {location.reload(); } );
  }
}
