import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['ID', 'FirstName', 'LastName', 'MobileNo',
                                 'DoB', 'Gender', 'BloodGroup', 'Hospital', 'CreatedOn',
                                  'Active', 'EditView'];
  patients: IPatient[] = [];
  dataSource = new MatTableDataSource<IPatient>(this.patients);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private patientService: PatientService) { }
  ngOnInit(): void {
    this.getPatientList();
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getPatientList(){
    this.patientService.getAllPatient().subscribe(response => {
      this.patients = response;
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
