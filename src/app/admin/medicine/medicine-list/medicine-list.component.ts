import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IMedicine, IMedicinePagination } from 'src/app/core/models/Medicine/medicinePagination';
import { MedicineService } from '../medicine.service';


import { filter, distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit , AfterViewInit  {
title = 'Medicine List';
footerName = 'Data';
displayedColumns: string[] = ['ID', 'BrandName', 'GenericName', 'Manufacturar', 'Active', 'Edit/View'];
medicines: IMedicine[] = [];
dataSource = new MatTableDataSource<IMedicine>(this.medicines);
@ViewChild(MatSort, {static: false}) sort: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
  // paginator prop
  patientwithpaging: IMedicinePagination;
  totalRows: number;
  currentPage = 1;
  pageSize =  20;
  filterValue: string;
  pageSizeOptions: number[] = [20, 50, 100];
  sortvalue: string;
  isAdmin$: Observable<boolean>;
  isDoctor$: Observable<boolean>;

  minLengthTerm = 3;
  patientsearch = new FormControl();
  
  constructor(private medicineService: MedicineService,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private router: Router) {
                
                this.patientsearch.valueChanges
                .pipe(
                  // filter(res => {
                  //   return res !== null && res.length >= this.minLengthTerm
                  // }),
                  distinctUntilChanged(),
                  debounceTime(2000),
                  tap(() => {
                    this.medicines = [];
                  }),
                  switchMap(value => this.medicineService.getAllMedicine(value, 'nameAsc', 1, 20)
                  )).subscribe(response => {
                    this.medicines = response.data;
                    this.dataSource.data = response.data;
                    this.filterValue = this.patientsearch.value;
                    setTimeout(() => {
                      this.paginator.length = response.count;
                    });
                  }, error => {
                    console.log(error);
                  }
                )
               }

  ngOnInit(): void {
    this.isAdmin$ = this.accountService.isAdmin$;
    this.isDoctor$ = this.accountService.isdesignationDoctor$;
    this.initDataWithPaginator();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => this.getMedicineList(this.sort.direction));
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
    this.getMedicineList('asc');
    this.dataSource.paginator = this.paginator;
  }
  getMedicineList(sort: string){
    if (this.filterValue)
    {
      this.medicineService.getAllMedicine(this.filterValue, sort, this.currentPage, this.pageSize).subscribe(response => {
        this.medicines = response.data;
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
    else {
      this.medicineService.getAllMedicine('', sort, this.currentPage, this.pageSize).subscribe(response => {
        this.medicines = response.data;
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
        this.getMedicineList('asc');
      });
    }
  // fieltering method
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    setTimeout(() => {
      this.medicineService.getAllMedicine(this.filterValue, 'nameAsc', 1, 20).subscribe(response => {
       this.medicines = response.data;
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
