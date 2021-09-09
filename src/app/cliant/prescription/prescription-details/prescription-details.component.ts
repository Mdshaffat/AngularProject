import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-details',
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.css']
})
export class PrescriptionDetailsComponent implements OnInit {
  prescriptionDetails: IPrescription;
  id: any;
  constructor(private activateRoute: ActivatedRoute,
              private prescriptionService: PrescriptionService,
              private toastr: ToastrService) { }

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
}

