import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IMedicine } from 'src/app/core/models/Medicine/medicine';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {
  title = 'Medicine Details';
  medicine: IMedicine;
  id: any;
  constructor(private activateRoute: ActivatedRoute,
              private medicineService: MedicineService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadMedicine();
  }

  loadMedicine(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.medicineService.getMedicineById(this.id).subscribe(response => {
      console.log(response);
      this.medicine = response;
    }, error => {
      console.log(error);
    });
  }
}

