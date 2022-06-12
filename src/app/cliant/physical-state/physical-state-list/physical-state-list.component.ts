import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IPhysicalState } from 'src/app/core/models/PhysicalState/getPhysicalState';
import { IPhysicalStatPagination } from 'src/app/core/models/PhysicalState/physicalstatPagination';
import { PhysicalStateService } from '../physical-state.service';

@Component({
  selector: 'app-physical-state-list',
  templateUrl: './physical-state-list.component.html',
  styleUrls: ['./physical-state-list.component.css']
})
export class PhysicalStateListComponent implements OnInit , AfterViewInit {
  title = 'Physical Stat List';
  footerName = 'Data';
  displayedColumns: string[] = ['PatientID', 'PatientName', 'VisitId', 'BloodPressure', 'HeartRate',
                                  'BodyTemparature', 'Weight', 'CreatedOn', 'CreatedBy', 'Edit/View'];
  physicalStates: IPhysicalState[] = [];
    // paginator prop
    physicalStatwithpaging: IPhysicalStatPagination;
    totalRows: number;
    currentPage = 1;
    pageSize =  20;
    filterValue: string;
    pageSizeOptions: number[] = [20, 50, 100, 1000];
    sortvalue: string;
    // endPaginator prop
  dataSource = new MatTableDataSource<IPhysicalState>(this.physicalStates);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private physicalStateService: PhysicalStateService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }
  ngOnInit(): void {
    this.initDataWithPaginator()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    this.getPhysicalStateList('asc');
  }
  getPhysicalStateList(sort: string){
    if (this.filterValue){
      this.physicalStateService.getAllPhysicalStates(this.filterValue, sort, this.currentPage, this.pageSize).subscribe(response => {
        this.physicalStates = response.data;
        this.totalRows = response.count;
        this.dataSource.data = response.data;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = response.count;
        });
      }, error => {
        console.log(error);
      });
    }else{
      this.physicalStateService.getAllPhysicalStates('', sort, this.currentPage, this.pageSize).subscribe(response => {
        this.physicalStates = response.data;
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
        this.getPhysicalStateList('asc');
      });
    }
    // end paging method

      // fieltering method
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    setTimeout(() => {
      this.physicalStateService.getAllPhysicalStates(this.filterValue, 'nameAsc', 1, 20).subscribe(response => {
       this.physicalStates = response.data;
       this.dataSource.data = response.data;
       setTimeout(() => {
         this.paginator.length = response.count;
       });
     }, error => {
       console.log(error);
     });
    }, 150);
 }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}

