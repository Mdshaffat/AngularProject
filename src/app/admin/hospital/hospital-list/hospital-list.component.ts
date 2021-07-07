import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Address', 'Upazila', 'District', 'Active', 'Action'];
  hospitals: IHospital[] = [];
  dataSource = new MatTableDataSource<IHospital>(this.hospitals);
  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.getHospitalList();
  }
  getHospitalList(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
      this.dataSource.data = response;
    }, error => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
