import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { VisitEntryService } from 'src/app/admin/visit-entry/visit-entry.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPhysicalState } from 'src/app/core/models/PhysicalState/getPhysicalState';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { PhysicalStateService } from '../../physical-state/physical-state.service';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit, AfterViewInit {
  prescriptionUpdateForm: FormGroup = new FormGroup({});
  prescription: IPrescription;
  hospitals: IHospital[];
  patients: IPatient[];
  physicalStates: IPhysicalState[];
  visitEntries: IVisitEntry[];
  id: any;
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private prescriptionService: PrescriptionService,
              private physicalStateService: PhysicalStateService,
              private hospitalService: HospitalService,
              private visitEntryService: VisitEntryService,
              private patientService: PatientService
              ) {}
  ngOnInit(): void {
    this.loadPrescription();
    this.loadHospital();
    this.loadPatient();
    this.loadVisitEntries();
    this.loadPhysicalStates();
    this.addUpdatePrescriptionForm();
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
      physicalStateId: ['', Validators.required],
      doctorsObservation: ['', Validators.required],
      adviceMedication: ['', Validators.required],
      adviceTest: ['', Validators.required],
      note: ['', Validators.required]
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
  loadHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });
  }
  loadPatient(){
    this.patientService.getAllPatient().subscribe(response => {
      this.patients = response;
    });
  }
  loadVisitEntries(){
    this.visitEntryService.getAllVisitEntry().subscribe(response => {
      this.visitEntries = response;
    });
  }
  loadPhysicalStates(){
    this.physicalStateService.getAllPhysicalStates().subscribe(response => {
      this.physicalStates = response;
    });
  }

}
