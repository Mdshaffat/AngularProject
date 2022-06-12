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
export class PregnancyListComponent implements OnInit , AfterViewInit  {

  displayedColumns: string[] = ['ID', 'Name', 
  'FDLP', 'EDD',
   'NextCheckup', 'Details'];
pregnancys: IPregnancy[] = [];
dataSource = new MatTableDataSource<IPregnancy>(this.pregnancys);
@ViewChild(MatSort, {static: false}) sort: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
title = 'Maternity Health';
footerName = 'Data';
// paginator prop
paginatedPregnancy: IPaginatedPregnancy;
totalRows: number;
currentPage = 1 ;
pageSize =  20;
filterValue: string;
pageSizeOptions: number[] = [20, 50, 100];
sortvalue: string;
// endPaginator prop

hospitalId: number;

  constructor(private pregnancyService: PregnancyService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }
              
  ngOnInit(): void {
    this.initDataWithPaginator();
  }
  
  ngAfterViewInit(): void {
    this.paginator.pageIndex = 1;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => this.getPregnancyList(this.sort.direction));
  }
  initDataWithPaginator(){
    this.activatedRoute.queryParamMap.subscribe((paramMap: Params) => {
      const pageIndex = +paramMap.get('pageIndex');
      const pageSize = +paramMap.get('pageSize');
      if (pageIndex){
        this.currentPage = pageIndex;
        this.pageSize = pageSize;
        this.paginator.pageIndex = pageIndex;
      }
      if (pageSize){
        this.pageSize = pageSize;
        this.paginator.pageSize = pageSize;
      }
    });
    this.getPregnancyList('asc');
    this.dataSource.paginator = this.paginator;
  }
  getPregnancyList(sort: string){
    if (this.filterValue)
    {
      this.pregnancyService.getAllPregnancy(this.filterValue, sort, this.currentPage, this.pageSize, 1).subscribe(response => {
        this.pregnancys = response.data;
        this.totalRows = response.count;
        this.dataSource.data = response.data;
        setTimeout(() => {
          this.paginator.pageIndex = response.pageIndex;
          this.paginator.length = response.count;
        });
      }, error => {
        console.log(error);
      });
    }
    else {
      this.pregnancyService.getAllPregnancy('', sort, this.currentPage, this.pageSize,1).subscribe(response => {
        this.pregnancys = response.data;
        this.totalRows = response.count;
        this.dataSource.data = response.data;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = response.count;
        });
      }, error => {
        console.log(error);
      });
    }
  }

  // paging method
  pageChanged(event: PageEvent) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        pageIndex: this.currentPage = event.pageIndex,
        pageSize: this.pageSize = event.pageSize
      }
    });
    this.activatedRoute.queryParamMap.subscribe((paramMap: Params) => {
      const pageIndex = +paramMap.get('pageIndex');
      const pageSize = +paramMap.get('pageSize');
      if (pageIndex){
        this.currentPage = pageIndex;
        this.paginator.pageIndex = pageIndex;
      }
      if (pageSize){
        this.pageSize = pageSize;
        this.paginator.pageSize = pageSize;
      }
      this.getPregnancyList('asc');
    });
  }
  // end paging method

  // fieltering method
  applyFilter(event: Event) {
     this.filterValue = (event.target as HTMLInputElement).value;
     setTimeout(() => {
       this.pregnancyService.getAllPregnancy(this.filterValue, 'nameAsc', 1, 20, null).subscribe(response => {
        this.pregnancys = response.data;
        this.dataSource.data = response.data;
        setTimeout(() => {
          this.paginator.length = response.count;
        });
      }, error => {
        console.log(error);
      });
     }, 150);
  }
}
