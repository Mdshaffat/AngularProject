import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { VisitEntryService } from 'src/app/admin/visit-entry/visit-entry.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IHeightFeet, IHeightInch } from 'src/app/core/models/Patient/patientHeightandWeight';
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
  patients: IPatient[] = [];
  patientsearch = new FormControl();
  filteredPatient: Observable<IPatient[]>;
  visitEntries: IVisitEntry[];
  id: any;
  heightFeet: IHeightFeet[] = [
    {feet: 1},
    {feet: 2},
    {feet: 3},
    {feet: 4},
    {feet: 5},
    {feet: 6},
    {feet: 7},
    {feet: 8}

  ];
  heightInch: IHeightInch[] = [
    {inch: 1},
    {inch: 2},
    {inch: 3},
    {inch: 4},
    {inch: 5},
    {inch: 6},
    {inch: 7},
    {inch: 8},
    {inch: 9},
    {inch: 10},
    {inch: 11}
  ];
  constructor(private toastr: ToastrService,
              private physicalStateService: PhysicalStateService,
              private hospitalService: HospitalService,
              private visitEntryService: VisitEntryService,
              private patientService: PatientService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              ) {
                this.filteredPatient = this.patientsearch.valueChanges
                .pipe(
                  startWith(''),
                  map(p => p ? this._filterPatient(p) : this.patients.slice())
                      );
              }
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
      patientId: ['', Validators.required],
      visitEntryId: [],
      bodyTemparature: [],
      heightFeet: [],
      heightInches: [],
      bloodPressureSystolic: [],
      bloodPressureDiastolic: [],
      heartRate: [],
      pulseRate: [],
      spO2: [],
      weight: []
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
      patientId: this.physicalState.patientId,
      visitEntryId: this.physicalState.visitEntryId,
      bodyTemparature: this.physicalState.bodyTemparature,
      heightFeet: this.physicalState.heightFeet,
      heightInches: this.physicalState.heightInches,
      bloodPressureSystolic: this.physicalState.bloodPressureSystolic,
      bloodPressureDiastolic: this.physicalState.bloodPressureDiastolic,
      heartRate: this.physicalState.heartRate,
      pulseRate: this.physicalState.pulseRate,
      spO2: this.physicalState.spO2,
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
  private _filterPatient(value: string): IPatient[] {
    const filterValue = value.toLowerCase();
    const result = this.patients.filter(
      (p) =>
        p.firstName?.toLowerCase().includes(filterValue) ||
        p.lastName?.toLowerCase().includes(filterValue) ||
        p.mobileNumber?.toLowerCase().includes(filterValue)
    );
    return result;
  }

}
