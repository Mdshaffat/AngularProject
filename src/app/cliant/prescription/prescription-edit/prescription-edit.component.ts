import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit, AfterViewInit {
  prescriptionUpdateForm: FormGroup = new FormGroup({});
  prescription: IPrescription;
  id: any;
  patientAge: number ;
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private prescriptionService: PrescriptionService
              ) {}
  ngOnInit(): void {
    this.loadPrescription();
    this.addUpdatePrescriptionForm();
    this.populatePrescriptionUpdateFrom();
    this.CalculateAge();
    this.patientAge = this.calculateAge(this.prescription.patientDob.getDate);
  }
  ngAfterViewInit(){
    this.populatePrescriptionUpdateFrom();
  }

  addUpdatePrescriptionForm(){
    this.prescriptionUpdateForm = this.fb.group({
      id: [this.id],
      hospitalId: ['', Validators.required],
      patientId: ['', Validators.required],
      visitEntryId: ['', Validators.required],
      physicalStateId: [],
      doctorsObservation: [''],
      adviceMedication: [''],
      adviceTest: [''],
      note: ['']
    });
  }
  get f(){
    return this.prescriptionUpdateForm.controls;
  }

  loadPrescription(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.prescriptionService.getPrescriptionById(this.id).subscribe(response => {
      console.log(response);
      this.prescription = response;
    }, error => {
      console.log(error);
    });
  }
  populatePrescriptionUpdateFrom(){
    this.prescriptionUpdateForm.patchValue({
      hospitalId: this.prescription.hospitalId,
      patientId: this.prescription.patientId,
      visitEntryId: this.prescription.visitEntryId,
      physicalStateId: this.prescription.physicalStateId,
      doctorsObservation: this.prescription.doctorsObservation,
      adviceMedication: this.prescription.adviceMedication,
      adviceTest: this.prescription.adviceTest,
      note: this.prescription.note
    });
  }

  onSubmit(){
    this.prescriptionService.updatePrescription(this.prescriptionUpdateForm.value).subscribe(response => {
      this.toastr.success(' Updated');
      console.log(response);
      this.router.navigateByUrl('/prescription/list').then(() => {location.reload(); } );
    },
    error => {
      this.toastr.error('error to Update');
      console.log(error);
    }
    );
  }
  public calculateAge(birthdate: any): number {
    const age =  moment().diff(birthdate, 'years');
    return age;
  }
  public CalculateAge(): void {
    if (this.prescription.patientDob) {
      const timeDiff = Math.abs(Date.now() - new Date(this.prescription.patientDob).getTime());
      this.patientAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
        }
      }

}
