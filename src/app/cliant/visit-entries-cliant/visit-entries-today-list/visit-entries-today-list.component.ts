import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { VisitEntriesAddComponent } from '../visit-entries-add/visit-entries-add.component';
import { VisitEntriesCliantService } from '../visit-entries-cliant.service';
import { VisitEntriesEditComponent } from '../visit-entries-edit/visit-entries-edit.component';
import { VisitEntriesStatusUpdateComponent } from '../visit-entries-status-update/visit-entries-status-update.component';


@Component({
  selector: 'app-visit-entries-today-list',
  templateUrl: './visit-entries-today-list.component.html',
  styleUrls: ['./visit-entries-today-list.component.css']
})
export class VisitEntriesTodayListComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['HospitalName', 'Date', 'FirstName', 'LastName', 'Serial',
                                 'Status', 'EditStatus', 'Edit'];
  footerName = 'Data';
  visitEntries: IVisitEntry[] = [];
  hospitals: IHospitalSortByName[] = [];
  hospitalId: number;
  dataSource = new MatTableDataSource(this.visitEntries);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private visitEntryService: VisitEntriesCliantService,
              private accountService: AccountService,
              private hospitalService: HospitalService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getCurrectUserHospitalId();
    this.getHospital();
    this.getVisitEntryList();
    this.dataSource = new MatTableDataSource(this.visitEntries);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getVisitEntryList(){
    this.visitEntryService.getAllCurrentDayVisitEntry().subscribe(response => {
      this.visitEntries = response;
      this.dataSource.data = response;
    }, error => {
      console.log(error);
    });
  }

  // todays visit list according to hospital
  visitListAccordingToHospital(hospitalId) {
    this.visitEntryService.getTodayVisitEntriesAccordingToHospital(hospitalId).subscribe(response => {
      this.visitEntries = response;
      this.dataSource.data = response;
    }, error => {
      console.log(error);
    });
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  VisitEntryRowData(data: any){
      this.visitEntryService.addVisitEntry(data).subscribe(response => {
        this.toastr.success('Added');
        location.reload();
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error('Error to Add.');
      });
    }

    updateVisitEntryRowData(){
      this.visitEntryService.getAllCurrentDayVisitEntry().subscribe(response => {
        this.visitEntries = response;
        this.dataSource = new MatTableDataSource(response);
      }, error => {
        console.log(error);
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
          this.getVisitEntryList();
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

