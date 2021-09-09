import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPhysicalState } from 'src/app/core/models/PhysicalState/getPhysicalState';
import { PhysicalStateService } from '../physical-state.service';

@Component({
  selector: 'app-physical-state-list',
  templateUrl: './physical-state-list.component.html',
  styleUrls: ['./physical-state-list.component.css']
})
export class PhysicalStateListComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['PatientID', 'PatientName', 'VisitId', 'BloodPressure', 'HeartRate',
                                  'BodyTemparature', 'Weight', 'CreatedOn', 'CreatedBy', 'Action'];
  physicalStates: IPhysicalState[] = [];
  dataSource = new MatTableDataSource<IPhysicalState>(this.physicalStates);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private physicalStateService: PhysicalStateService) { }
  ngOnInit(): void {
    this.getPhysicalStateList();
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getPhysicalStateList(){
    this.physicalStateService.getAllPhysicalStates().subscribe(response => {
      this.physicalStates = response;
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
}

