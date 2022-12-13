import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { filter, distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/operators';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPatientPagination } from 'src/app/core/models/Patient/patientpagination';
import { TableUtil } from 'src/app/Shared/Inputes/ExportAsExcel/TableUtil';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['serialNumber', 'ID', 'FirstName', 'LastName', 'MobileNo',
                                 'DoB', 'Gender', 'BloodGroup', 'Hospital', 'CreatedBy', 'CreatedOn',
                                  'Member', 'EditView'];
  patients: IPatient[] = [];
  dataSource = new MatTableDataSource<IPatient>(this.patients);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  title = 'Patient List';
  footerName = 'Data';
  // paginator prop
  patientwithpaging: IPatientPagination;
  totalRows: number;
  currentPage = 1 ;
  pageSize =  20;
  filterValue: string;
  pageSizeOptions: number[] = [20, 50, 100];
  sortvalue: string;
  minLengthTerm = 3;
  patientsearch = new FormControl();
  // endPaginator prop
  constructor(private patientService: PatientService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 
                this.patientsearch.valueChanges
                .pipe(
                  // filter(res => {
                  //   return res !== null && res.length >= this.minLengthTerm
                  // }),
                  distinctUntilChanged(),
                  debounceTime(2000),
                  tap(() => {
                    this.patients = [];
                  }),
                  switchMap(value => this.patientService.getAllPatient(value, 'nameAsc', 1, 20)
                  )).subscribe(response => {
                    this.patients = response.data;
                    this.dataSource.data = response.data;
                    this.filterValue = this.patientsearch.value;
                    setTimeout(() => {
                      this.paginator.length = response.count;
                    });
                  }
                )
              }
  ngOnInit(): void {
    this.initDataWithPaginator();
  }
  ngAfterViewInit() {
    this.paginator.pageIndex = 1;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => this.getPatientList(this.sort.direction));
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
    this.getPatientList('asc');
    this.dataSource.paginator = this.paginator;
  }
  getPatientList(sort: string){
    if (this.filterValue)
    {
      this.patientService.getAllPatient(this.filterValue, sort, this.currentPage, this.pageSize).subscribe(response => {
        this.patients = response.data;
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
      this.patientService.getAllPatient('', sort, this.currentPage, this.pageSize).subscribe(response => {
        this.patients = response.data;
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
  exportArray() {
    if (confirm('Are you sure to Download ?')) {
      const patients = this.dataSource.filteredData.map(x => ({
        HospitalName: x.hospitalName,
        BranchName: x.branchName,
        FirstName: x.firstName,
        LastName: x.lastName,
        Address: x.address,
        Division: x.division,
        District: x.district,
        Upazila: x.upazila,
        DateOfBirth: (moment(x.doB)).format('DD-MM-YYYY') ,
        MobileNumber: x.mobileNumber,
        Gender: x.gender,
        Age: x.age,
        NID: x.nid,
        BloodGroup: x.bloodGroup,
        Maritaltatus: x.maritalStatus,
        PrimaryMember: x.primaryMember,
        RegistrationNumber: x.membershipRegistrationNumber,
        CreatedOn: (moment(x.createdOn)).format('DD-MM-YYYY'),
        CreatedBy: x.createdBy,
        UpdatedOn: (moment(x.updatedOn)).format('DD-MM-YYYY') ,
        UpdatedBy: x.updatedBy

      }));
      TableUtil.exportArrayToExcel(patients, 'Patient List');
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
      this.getPatientList('asc');
    });
  }
  // end paging method

  // fieltering method
  // applyFilter(event: Event) {
  //    this.filterValue = (event.target as HTMLInputElement).value;

  //   if(this.filterValue.length >= this.minLengthTerm)
  //   {
  //     distinctUntilChanged(),
  //     debounceTime(1500),
  //      setTimeout(() => {
  //        this.patientService.getAllPatient(this.filterValue, 'nameAsc', 1, 20).subscribe(response => {
  //         this.patients = response.data;
  //         this.dataSource.data = response.data;
  //         setTimeout(() => {
  //           this.paginator.length = response.count;
  //         });
  //       }, error => {
  //         console.log(error);
  //       });
  //      }, 150);
  //   }
  // }
}
