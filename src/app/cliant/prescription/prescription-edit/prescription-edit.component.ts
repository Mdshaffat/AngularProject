import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { IPrescriptionWithVital } from 'src/app/core/models/Prescriptions/getPrescriptionWithVital';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit, AfterViewInit {
  prescriptionUpdateForm: FormGroup = new FormGroup({});
  prescription: IPrescriptionWithVital;
  id: any;
  patientAge: number ;
  currentDate = moment();
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
      doctorsObservation: ['', Validators.maxLength(2000)],
      adviceMedication: ['', Validators.maxLength(2000)],
      adviceTest: ['', Validators.maxLength(2000)],
      nextVisit: [ ],
      note: ['', Validators.maxLength(2000)],
      appearance: [],
      anemia: [],
      jundice: [],
      dehydration: [],
      edema: [],
      cyanosis: [],
      heart: [],
      lung: [],
      abdomen: [],
      kub: []
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
      doctorsObservation: this.prescription.doctorsObservation,
      adviceMedication: this.prescription.adviceMedication,
      adviceTest: this.prescription.adviceTest,
      note: this.prescription.note,
      appearance: this.prescription.generalExamination.appearance,
      anemia: this.prescription.generalExamination.anemia,
      jundice: this.prescription.generalExamination.jundice,
      dehydration: this.prescription.generalExamination.dehydration,
      edema: this.prescription.generalExamination.edema,
      cyanosis: this.prescription.generalExamination.cyanosis,
      heart: this.prescription.generalExamination.heart,
      lung: this.prescription.generalExamination.lung,
      abdomen: this.prescription.generalExamination.abdomen,
      kub: this.prescription.generalExamination.kub
    });
  }

  onSubmit(){
    this.prescriptionService.updatePrescription(this.prescriptionUpdateForm.value).subscribe(response => {
      this.toastr.success(' Updated');
      console.log(response);
      this.router.navigateByUrl('/prescription/details/' + this.id).then(() => {location.reload(); } );
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
