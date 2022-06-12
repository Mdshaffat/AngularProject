import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { IprescriptionPagination } from 'src/app/core/models/Prescriptions/prescriptionPagination';
import { IUserTokenProvider } from 'src/app/core/models/UserTokenProvider';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit , AfterViewInit {
  title = 'Prescription List';
  footerName = 'Data';
  currentUser$: Observable<IUserTokenProvider>;
  isAdmin$: Observable<boolean>;
  isDoctor$: Observable<boolean>;
  displayedColumns: string[] = ['Id', 'PatientId', 'PatientName', 'PatientMobile', 'DoctorName', 'hospitalName' , 'CreatedOn', 'Edit/View'];
  prescriptions: IPrescription[] = [];
    // paginator prop
    prescriptionwithpaging: IprescriptionPagination;
    totalRows: number;
    currentPage = 1;
    pageSize =  20;
    filterValue: string;
    pageSizeOptions: number[] = [20, 50, 100];
    sortvalue: string;
    // endPaginator prop
  dataSource = new MatTableDataSource<IPrescription>(this.prescriptions);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private prescriptionService: PrescriptionService,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
    this.isDoctor$ = this.accountService.isDoctor$;
    this.intDataWithPaginator();

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  intDataWithPaginator() {
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
    this.getprescriptionList('asc');
    this.dataSource.paginator = this.paginator;
  }
  getprescriptionList(sort: string){
    if (this.filterValue){
      this.prescriptionService.getAllPrescriptions(this.filterValue, sort, this.currentPage, this.pageSize).subscribe(response => {
        this.prescriptions = response.data;
        this.totalRows = response.count;
        this.dataSource.data = response.data;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = response.count;
        });
      }, error => {
        console.log(error);
      });
    }else {
      this.prescriptionService.getAllPrescriptions('', sort, this.currentPage, this.pageSize).subscribe(response => {
        this.prescriptions = response.data;
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
        this.getprescriptionList('asc');
      });
    }
    // end paging method
    applyFilter(event: Event) {
      this.filterValue = (event.target as HTMLInputElement).value;
      setTimeout(() => {
        this.prescriptionService.getAllPrescriptions(this.filterValue, 'nameAsc', 1, 20).subscribe(response => {
         this.prescriptions = response.data;
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

