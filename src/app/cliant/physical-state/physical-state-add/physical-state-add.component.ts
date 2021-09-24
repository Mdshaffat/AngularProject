import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { VisitEntryService } from 'src/app/admin/visit-entry/visit-entry.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { PhysicalStateService } from '../physical-state.service';

@Component({
  selector: 'app-physical-state-add',
  templateUrl: './physical-state-add.component.html',
  styleUrls: ['./physical-state-add.component.css']
})
export class PhysicalStateAddComponent implements OnInit {

  physicalStateAddForm: FormGroup = new FormGroup({});
  hospitals: IHospital[];
  patients: IPatient[];
  visitEntries: IVisitEntry[];
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private physicalStateService: PhysicalStateService,
              private hospitalService: HospitalService,
              private visitEntryService: VisitEntryService,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadHospital();
    this.loadPatient();
    this.loadVisitEntries();
    this.createphysicalStateAddForm();
  }

  createphysicalStateAddForm(){
    this.physicalStateAddForm = this.fb.group({
      patientId: ['', Validators.required],
      visitEntryId: [],
      bodyTemparature: [],
      heightFeet: [],
      heightInches: [],
      bloodPressure: [],
      heartRate: [],
      pulseRate: [],
      spO2: [],
      weight: []
    });
  }

  get f(){
    return this.physicalStateAddForm.controls;
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
  onSubmit(){
    this.physicalStateService.addPhysicalState(this.physicalStateAddForm.value).subscribe(response => {
      this.toastr.success( 'Added' , 'Success' );
      this.router.navigateByUrl('/physicalstate/list').then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
  }
}
