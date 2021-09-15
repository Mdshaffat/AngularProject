import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit-entries-cliant',
  templateUrl: './visit-entries-cliant.component.html',
  styleUrls: ['./visit-entries-cliant.component.css']
})
export class VisitEntriesCliantComponent implements OnInit {

  selectedTabIndex = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  allVisit(){
    this.router.navigateByUrl('/visitentries/list');
  }
  currentVisit(){
    this.router.navigateByUrl('/visitentries/todayslist');
  }

}
