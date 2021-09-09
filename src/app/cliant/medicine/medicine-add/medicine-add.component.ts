import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-add',
  templateUrl: './medicine-add.component.html',
  styleUrls: ['./medicine-add.component.css']
})
export class MedicineAddComponent implements OnInit {
  medicineAddForm: FormGroup = new FormGroup({});
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.createmedicineAddForm();
  }

  createmedicineAddForm(){
    this.medicineAddForm = this.fb.group({
      brandName: ['', Validators.required],
      genericName: ['', Validators.required],
      manufacturar: ['', Validators.required],
      unit: ['', Validators.required],
      unitPrice: ['', Validators.required],
      isActive: [true, Validators.required]
    });
  }

  get f(){
    return this.medicineAddForm.controls;
  }

  onSubmit(){
    this.medicineService.addMedicine(this.medicineAddForm.value).subscribe(response => {
      this.toastr.success( 'Added' , 'Success' );
      this.router.navigateByUrl('/medicine').then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
  }
}
