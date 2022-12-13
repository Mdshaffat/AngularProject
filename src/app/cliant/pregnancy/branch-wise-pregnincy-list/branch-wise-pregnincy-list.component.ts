import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IFollowUpPagination } from 'src/app/core/models/FollowUp/followuppaginations';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { IPregnancy } from 'src/app/core/models/pregnancyModel/paginatedPregnancy';
import { PregnancyService } from '../pregnancy.service';

@Component({
  selector: 'app-branch-wise-pregnincy-list',
  templateUrl: './branch-wise-pregnincy-list.component.html',
  styleUrls: ['./branch-wise-pregnincy-list.component.css']
})
export class BranchWisePregnincyListComponent implements OnInit, AfterViewInit {
  title = 'Maternity Health';
  footerName = 'Data';
  displayedColumns: string[] = ['ID', 'Name',
  'FDLP', 'EDD',
   'NextCheckup', 'Details'];
  followUps: IPregnancy[] = [];
  hospitals: IHospitalSortByName[] = [];
    // paginator prop
    followUpwithpaging: IFollowUpPagination;
    totalRows: number;
    currentPage = 1;
    pageSize =  50;
    filterValue: string;
    pageSizeOptions: number[] = [50, 100, 1000];
    sortvalue: string;
    // endPaginator prop
  hospitalId: number;
  dataSource = new MatTableDataSource(this.followUps);

  minLengthTerm = 3;
  followupsearch = new FormControl();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private pregnancyService: PregnancyService,
              private accountService: AccountService,
              private hospitalService: HospitalService,
              private router: Router,
              public dialog: MatDialog) {
                this.followupsearch.valueChanges
                .pipe(
                  // filter(res => {
                  //   return res !== null && res.length >= this.minLengthTerm
                  // }),
                  distinctUntilChanged(),
                  debounceTime(2000),
                  tap(() => {
                    this.followUps = [];
                  }),
                  switchMap(value => this.pregnancyService.getAllPregnancy(value, 'nameAsc', 1, 50, this.hospitalId)
                  )).subscribe(response => {
                    this.followUps = response.data;
                    this.dataSource.data = response.data;
                    this.filterValue = this.followupsearch.value;
                    setTimeout(() => {
                      this.paginator.length = response.count;
                    });
                  }, error => {
                    console.log(error);
                  }
                );
               }
  ngOnInit(): void {
    this.getCurrectUserHospitalId();
    this. motherListAccordingToHospital(this.hospitalId);
    this.getHospital();
    this.dataSource = new MatTableDataSource(this.followUps);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // todays visit list according to hospital
  motherListAccordingToHospital(hospitalId) {
    if (this.filterValue){
      this.pregnancyService.getAllPregnancy(this.filterValue, '', this.currentPage, this.pageSize, hospitalId).subscribe(response => {
        this.followUps = response.data;
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
      this.pregnancyService.getAllPregnancy('', '', this.currentPage, this.pageSize, hospitalId).subscribe(response => {
        this.followUps = response.data;
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
    console.log({ event });
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.motherListAccordingToHospital(this.hospitalId);
  }
  // end paging method

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    setTimeout(() => {
      this.pregnancyService.getAllPregnancy(this.filterValue, 'nameAsc', 1, 50, this.hospitalId).subscribe(response => {
       this.followUps = response.data;
       this.dataSource.data = response.data;
       setTimeout(() => {
         this.paginator.length = response.count;
       });
     }, error => {
       console.log(error);
     });
    }, 150);
  }

      getHospital(){
        this.hospitalService.getAllHospitalSortByName().subscribe(response => {
          this.hospitals = response;
        }, error => {
          console.log(error);
        });
      }
      getCurrectUserHospitalId(){
        const hospitalid =  this.accountService.getDecoadedHospitalIdFromToken();
        if (hospitalid){
             this.hospitalId = +hospitalid;
           }
       }
}

