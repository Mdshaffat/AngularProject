import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { IPrescriptionWithVital } from 'src/app/core/models/Prescriptions/getPrescriptionWithVital';
import { IPrescriptionWithPhysicalStatAndDiagnosis } from 'src/app/core/models/Prescriptions/prescriptionWithPhysicalStatAdnDiagnosis';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-details',
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.css']
})
export class PrescriptionDetailsComponent implements OnInit {
  prescriptionDetails: IPrescriptionWithPhysicalStatAndDiagnosis;
  id: any;
  constructor(private activateRoute: ActivatedRoute,
              private prescriptionService: PrescriptionService,
              private toastr: ToastrService,
              private location: Location) { }

  ngOnInit(): void {
    this.loadPrescription();
  }


  loadPrescription(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.prescriptionService.getPrescriptionById(this.id).subscribe(response => {
      console.log(response);
      this.prescriptionDetails = response;
    }, error => {
      console.log(error);
    });
  }
  printData() {
    window.print();
    }
  goBack(){
      this.location.back();
    }
}

