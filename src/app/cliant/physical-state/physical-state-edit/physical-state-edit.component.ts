import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { VisitEntryService } from 'src/app/admin/visit-entry/visit-entry.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPhysicalState } from 'src/app/core/models/PhysicalState/getPhysicalState';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { PhysicalStateService } from '../physical-state.service';

@Component({
  selector: 'app-physical-state-edit',
  templateUrl: './physical-state-edit.component.html',
  styleUrls: ['./physical-state-edit.component.css']
})
export class PhysicalStateEditComponent implements OnInit, AfterViewInit {
  updatePhysicalStateForm: FormGroup = new FormGroup({});
  physicalState: IPhysicalState;
  hospitals: IHospital[];
  patients: IPatient[];
  visitEntries: IVisitEntry[];
  id: any;
  constructor(private toastr: ToastrService,
              private physicalStateService: PhysicalStateService,
              private hospitalService: HospitalService,
              private visitEntryService: VisitEntryService,
              private patientService: PatientService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              ) {}
  ngOnInit(): void {
    this.loadHospital();
    this.loadPatient();
    this.loadVisitEntries();
    this.loadPhysicalState();
    this.createUpdatePhysicalStateForm();
  }
  ngAfterViewInit(){
    this.populatePhysicalStateFrom();
  }
  createUpdatePhysicalStateForm(){
    this.updatePhysicalStateForm = this.fb.group({
      id: [this.id],
      hospitalId: ['', Validators.required],
      patientId: ['', Validators.required],
      visitEntryId: ['', Validators.required],
      bloodPressure: ['', Validators.required],
      heartRate: ['', Validators.required],
      bodyTemparature: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }
  get f(){
    return this.updatePhysicalStateForm.controls;
  }

  loadPhysicalState(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.physicalStateService.getPhysicalStateById(this.id).subscribe(response => {
      console.log(response);
      this.physicalState = response;
    }, error => {
      console.log(error);
    });
  }
  populatePhysicalStateFrom(){
    this.updatePhysicalStateForm.patchValue({
      hospitalId: this.physicalState.hospitalId,
      patientId: this.physicalState.patientId,
      visitEntryId: this.physicalState.visitEntryId,
      bloodPressure: this.physicalState.bloodPressure,
      heartRate: this.physicalState.heartRate,
      bodyTemparature: this.physicalState.bodyTemparature,
      weight: this.physicalState.weight
    });
  }

  onSubmit(){
    this.physicalStateService.updatePhysicalState(this.updatePhysicalStateForm.value).subscribe(response => {
      this.toastr.success(' Updated');
      console.log(response);
      this.router.navigateByUrl('/physicalstate/list').then(() => {location.reload(); } );
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

}
