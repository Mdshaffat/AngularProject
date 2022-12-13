import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { FormControl } from '@angular/forms';
import { BloodCampService } from '../blood-camp.service';
import { IDonerInformation, IPaginatedDonerInformation } from 'src/app/core/models/Doner/donerinfo';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { UpazilaAndDistrictService } from '../../patient/upazila-and-district.service';
import { IBloodGroup } from 'src/app/core/models/Doner/bloodgroup';

@Component({
  selector: 'app-blood-camp-list',
  templateUrl: './blood-camp-list.component.html',
  styleUrls: ['./blood-camp-list.component.css']
})
export class BloodCampListComponent implements OnInit  , AfterViewInit  {
  title = 'Blood Camp';
  footerName = 'Data';
  displayedColumns: string[] = ['name', 'mobileNumber', 'bloodGroup', 'address', 'division', 'district', 'upazila'];
  donerInformation: IDonerInformation[] = [];
  dataSource = new MatTableDataSource<IDonerInformation>(this.donerInformation);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    // paginator prop
    patientwithpaging: IPaginatedDonerInformation;
    totalRows: number;
    currentPage = 1;
    pageSize =  20;
    filterValue: string;
    pageSizeOptions: number[] = [20, 50, 100];
    sortvalue: string;
    isAdmin$: Observable<boolean>;
    isDoctor$: Observable<boolean>;

    // search Information ////////
    bloodGroupId = 0;
    divisionId = 0;
    districtId = 0;
    upazilaId = 0;

    // Search Info End ///////
    //
    upazilas: IUpazila[] = [];
    districts: IDistrict[] = [];
    divisions: IDivision[] = [];
    bloodGroups: IBloodGroup[] = [];
    //

    minLengthTerm = 3;
    patientsearch = new FormControl();

    constructor(private bloodCampService: BloodCampService,
                private activatedRoute: ActivatedRoute,
                private accountService: AccountService,
                private upazilaAndDistrictService: UpazilaAndDistrictService,
                private router: Router) { }

    ngOnInit(): void {
      this.loadDivision();
      this.loadBloodGroup();
      this.isAdmin$ = this.accountService.isAdmin$;
      this.isDoctor$ = this.accountService.isdesignationDoctor$;
      this.initDataWithPaginator();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.sortChange.subscribe(() => this.getDonerList(this.sort.direction));
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
      this.getDonerList('asc');
      this.dataSource.paginator = this.paginator;
    }
    getDonerList(sort: string){
        this.bloodCampService.getDonerList(this.currentPage,
                                           this.pageSize,
                                           this.bloodGroupId,
                                           this.divisionId,
                                           this.districtId,
                                           this.upazilaId).subscribe(response => {
          this.donerInformation = response.data;
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
          this.getDonerList('asc');
        });
      }
    // fieltering method
    applyFilter(event: Event) {
      this.filterValue = (event.target as HTMLInputElement).value;
      setTimeout(() => {
        this.bloodCampService.getDonerList(this.currentPage,
          this.pageSize,
          this.bloodGroupId,
          this.divisionId,
          this.districtId,
          this.upazilaId).subscribe(response => {
         this.donerInformation = response.data;
         this.dataSource.data = response.data;
         setTimeout(() => {
           this.paginator.length = response.count;
         });
       }, error => {
         console.log(error);
       });
      }, 150);
   }

   loadDivision(){
    this.upazilaAndDistrictService.getAllDivision().subscribe(response => {
      this.divisions = response;
    });
  }
  loadDistrictBySelectDivision(id: number){
    this.upazilaAndDistrictService.getAllDistrictByDivisionId(id).subscribe(response => {
      this.districts = response;
    });
  }
  // loadDistrict(){
  //   this.upazilaAndDistrictService.getAllDistrict().subscribe(response => {
  //     this.districts = response;
  //   });
  // }
  loadUpazilaBySelectDistrict(id: number){
    this.upazilaAndDistrictService.getAllUpazilaByDistrictId(id).subscribe(response => {
      this.upazilas = response;
    });
  }
  loadBloodGroup(){
    this.upazilaAndDistrictService.getAllBloodGroup().subscribe(response => {
      this.bloodGroups = response;
    });
  }
  onSearch() {
    this.donerInformation = [];
    this.bloodCampService.getDonerList(this.currentPage,
                this.pageSize,
                this.bloodGroupId,
                this.divisionId,
                this.districtId,
                this.upazilaId).subscribe(response => {
                            this.donerInformation = response.data;
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
