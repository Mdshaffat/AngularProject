import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css']
})
export class HospitalDetailsComponent implements OnInit {
  hospitalDetails: IHospital;
  id: any;
  constructor(private activateRoute: ActivatedRoute, private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.loadHospital();
  }
  loadHospital(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.hospitalService.getHospitalById(this.id).subscribe(response => {
      console.log(response);
      this.hospitalDetails = response;
    }, error => {
      console.log(error);
    });
  }

}
