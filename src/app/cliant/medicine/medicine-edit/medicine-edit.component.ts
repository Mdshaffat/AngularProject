import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IMedicine } from 'src/app/core/models/Medicine/medicine';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-edit',
  templateUrl: './medicine-edit.component.html',
  styleUrls: ['./medicine-edit.component.css']
})
export class MedicineEditComponent implements OnInit , AfterViewInit {
  updatemedicineForm: FormGroup = new FormGroup({});
  medicine: IMedicine;
  id: any;
  constructor(private toastr: ToastrService,
              private medicineService: MedicineService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadMedicine();
    this.createUpdateHospitalForm();
    this.populateMedicineFrom();
  }
  ngAfterViewInit(){
    this.populateMedicineFrom();
  }
  createUpdateHospitalForm(){
    this.updatemedicineForm = this.fb.group({
      id: [this.id],
      brandName: ['', [Validators.required, Validators.maxLength(40)]],
      genericName: ['', [Validators.required, Validators.maxLength(50)]],
      manufacturar: ['', [Validators.required, Validators.maxLength(150)]],
      unit: ['',  [Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
      unitPrice: ['',  [Validators.maxLength(15)]],
      isActive: [true, Validators.required]
    });
  }
  get f(){
    return this.updatemedicineForm.controls;
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
  populateMedicineFrom(){
    this.updatemedicineForm.patchValue({
      brandName: this.medicine.brandName,
      genericName: this.medicine.genericName,
      manufacturar: this.medicine.manufacturar,
      unit: this.medicine.unit,
      unitPrice: this.medicine.unitPrice,
      isActive: this.medicine.isActive
    });
  }

  onSubmit(){
    this.medicineService.updateMedicine(this.updatemedicineForm.value).subscribe(response => {
      this.toastr.success('Updated');
      console.log(response);
      this.router.navigateByUrl('/medicine').then(() => {location.reload(); } );
    },
    error => {
      this.toastr.error('error to Update');
      console.log(error);
    }
    );
  }
}
