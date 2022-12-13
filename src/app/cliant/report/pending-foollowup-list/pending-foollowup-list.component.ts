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
import { IFollowup } from 'src/app/core/models/FollowUp/followup';
import { IFollowUpPagination } from 'src/app/core/models/FollowUp/followuppaginations';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-pending-foollowup-list',
  templateUrl: './pending-foollowup-list.component.html',
  styleUrls: ['./pending-foollowup-list.component.css']
})
export class PendingFoollowupListComponent implements OnInit, AfterViewInit {
  title = 'Followup List';
  footerName = 'Data';
  displayedColumns: string[] = ['patientname', 'mobilenumber', 'followupdate', 'doctor', 'hospital',
                                 'lastvisitdate', 'updatephysicalstat'];
  followUps: IFollowup[] = [];
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
  constructor(private reportService: ReportService,
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
                  switchMap(value => this.reportService.getPendingFollowUp(value, 'nameAsc', 1, 50, this.hospitalId)
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
    this. followupListAccordingToHospital(this.hospitalId);
    this.getHospital();
    this.dataSource = new MatTableDataSource(this.followUps);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // todays visit list according to hospital
  followupListAccordingToHospital(hospitalId) {
    if (this.filterValue){
      this.reportService.getPendingFollowUp(this.filterValue, '', this.currentPage, this.pageSize, hospitalId).subscribe(response => {
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
      this.reportService.getPendingFollowUp('', '', this.currentPage, this.pageSize, hospitalId).subscribe(response => {
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
    this.followupListAccordingToHospital(this.hospitalId);
  }
  // end paging method

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    setTimeout(() => {
      this.reportService.getPendingFollowUp(this.filterValue, 'nameAsc', 1, 50, this.hospitalId).subscribe(response => {
       this.followUps = response.data;
       this.dataSource.data = response.data;
       setTimeout(() => {
         this.paginator.length = response.count;
       });
     }, error => {
       console.log(error);
     });
    }, 150);
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
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
       updatePhysicalStat(id: number, name: string){
        this.router.navigate(['/physicalstate/add', id, name]);
       }
}

