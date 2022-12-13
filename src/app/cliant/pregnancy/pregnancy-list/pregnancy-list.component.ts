import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IPaginatedPregnancy, IPregnancy } from 'src/app/core/models/pregnancyModel/paginatedPregnancy';
import { PregnancyService } from '../pregnancy.service';

@Component({
  selector: 'app-pregnancy-list',
  templateUrl: './pregnancy-list.component.html',
  styleUrls: ['./pregnancy-list.component.css']
})
export class PregnancyListComponent implements OnInit  {

  electedTabIndex = 0;

hospitalId: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
