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
      brandName: ['', [Validators.required, Validators.maxLength(40)]],
      genericName: ['', [Validators.required, Validators.maxLength(50)]],
      manufacturar: ['', [Validators.required, Validators.maxLength(150)]],
      unit: ['', [Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      unitPrice: ['', [Validators.maxLength(8)]],
      isActive: [true]
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
