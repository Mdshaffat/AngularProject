import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { filter, distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { IVisitEntryPagination } from 'src/app/core/models/VisitEntry/visitentrypagination';
import { VisitEntriesAddComponent } from '../visit-entries-add/visit-entries-add.component';
import { VisitEntriesCliantService } from '../visit-entries-cliant.service';
import { VisitEntriesEditComponent } from '../visit-entries-edit/visit-entries-edit.component';
import { VisitEntriesStatusUpdateComponent } from '../visit-entries-status-update/visit-entries-status-update.component';

@Component({
  selector: 'app-visit-entries-list',
  templateUrl: './visit-entries-list.component.html',
  styleUrls: ['./visit-entries-list.component.css']
})
export class VisitEntriesListComponent implements OnInit  , AfterViewInit {
  displayedColumns: string[] = ['HospitalName', 'Date', 'FirstName', 'LastName', 'Serial',
                                 'Status', 'EditStatus', 'Edit'];
  footerName = 'Data';
  visitEntries: IVisitEntry[] = [];
  hospitals: IHospitalSortByName[] = [];
  hospitalId: number;
  // paginator prop
  visitentrieswithpaging: IVisitEntryPagination;
  totalRows: number;
  currentPage = 1;
  pageSize =  50;
  filterValue: string;
  pageSizeOptions: number[] = [50, 100, 1000];
  sortvalue: string;


  minLengthTerm = 3;
  patientsearch = new FormControl();
  // endPaginator prop
  dataSource = new MatTableDataSource<IVisitEntry>(this.visitEntries);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private visitEntryService: VisitEntriesCliantService,
              private hospitalService: HospitalService,
              private accountService: AccountService,
              private toastr: ToastrService,
              public dialog: MatDialog) { 
                this.patientsearch.valueChanges
                .pipe(
                  // filter(res => {
                  //   return res !== null && res.length >= this.minLengthTerm
                  // }),
                  distinctUntilChanged(),
                  debounceTime(2000),
                  tap(() => {
                    this.visitEntries = [];
                  }),
                  switchMap(value => this.visitEntryService.getVisitEntriesAccordingToHospital(
                    value, '', this.currentPage, this.pageSize, this.hospitalId)
                  )).subscribe(response => {
                    this.visitEntries = response.data;
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
    this. getCurrectUserHospitalId();
    this.getHospital();
    this.getVisitEnties();
    this.dataSource = new MatTableDataSource<IVisitEntry>(this.visitEntries);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getVisitEnties(){
    if (this.filterValue){
      this.visitEntryService.getAllVisitEntry(this.filterValue, '', this.currentPage, this.pageSize).subscribe(response => {
        this.visitEntries = response.data;
        this.totalRows = response.count;
        this.dataSource.data = response.data;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = response.count;
        });
      }, error => {
        console.log(error);
      });
    } else {
      this.visitEntryService.getAllVisitEntry('', '', this.currentPage, this.pageSize).subscribe(response => {
        this.visitEntries = response.data;
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
    // todays visit list according to hospital
    visitListAccordingToHospital(hospitalId) {
      if (this.filterValue) {
          this.visitEntryService.getVisitEntriesAccordingToHospital(this.filterValue, '', this.currentPage, this.pageSize, hospitalId)
          .subscribe(response => {
          this.visitEntries = response.data;
          this.dataSource.data = response.data;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.count;
          });
        }, error => {
          console.log(error);
        });
      }else {
        this.visitEntryService.getVisitEntriesAccordingToHospital('', '', this.currentPage, this.pageSize, hospitalId)
        .subscribe(response => {
        this.visitEntries = response.data;
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
    this.visitListAccordingToHospital(this.hospitalId);
  }
  // end paging method
    applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    setTimeout(() => {
      this.visitEntryService.getVisitEntriesAccordingToHospital(
              this.filterValue, '', this.currentPage, this.pageSize, this.hospitalId).subscribe(response => {
       this.visitEntries = response.data;
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
  // For Add And Updade Dialog Box
  // Add visit Entry
    openVisitEntryAddDialog() {
    const dialogBoxWithData = this.dialog.open(VisitEntriesAddComponent, {
      width: '80%',
    });
    dialogBoxWithData.afterClosed().subscribe(result => {
        this.patientVitalAddRowData(result.data);
    });
  }

    patientVitalAddRowData(data: any){
      this.visitEntryService.addVisitEntry(data).subscribe(response => {
        this.toastr.success('Added');
        location.reload();
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error('Error to Add.');
      });
    }

    // Update VisitEntry
    openUpdateVisitEntryDialog(obj: any) {
      const dialogBoxWithData = this.dialog.open(VisitEntriesEditComponent, {
        width: '80%',
        data: obj
      });
      dialogBoxWithData.afterClosed().subscribe(result => {
          this.updateVisitEntryRowData(result.data);
          console.log(result.data);
      });
    }

    updateVisitEntryRowData(data: any){
        this.visitEntryService.updateVisitEntry(data).subscribe(response => {
          this.toastr.success('Updated');
          location.reload();
          console.log(response);
        }, error => {
          console.log(error);
          location.reload();
          this.toastr.error('Error to Update.');
        });
      }

     // Update VistEntry Status
    openUpdateVisitEntryStatusDialog(obj: any) {
      const dialogBoxWithData = this.dialog.open(VisitEntriesStatusUpdateComponent, {
        width: '80%',
        data: obj
      });
      dialogBoxWithData.afterClosed().subscribe(result => {
          this.updateVisitEntryStatusRowData(result.data);
      });
    }

    updateVisitEntryStatusRowData(data: any){
        this.visitEntryService.updateVisitEntryStatus(data).subscribe(response => {
          this.toastr.success('Updated');
          location.reload();
          console.log(response);
        }, error => {
          console.log(error);
          this.toastr.error('Error to Update.');
        });
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
