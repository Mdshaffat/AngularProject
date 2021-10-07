import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { VisitEntryService } from 'src/app/admin/visit-entry/visit-entry.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IHeightFeet, IHeightInch } from 'src/app/core/models/Patient/patientHeightandWeight';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { VisitEntriesCliantService } from '../../visit-entries-cliant/visit-entries-cliant.service';
import { PhysicalStateService } from '../physical-state.service';

@Component({
  selector: 'app-physical-state-add',
  templateUrl: './physical-state-add.component.html',
  styleUrls: ['./physical-state-add.component.css']
})
export class PhysicalStateAddComponent implements OnInit {

  physicalStateAddForm: FormGroup = new FormGroup({});
  hospitals: IHospital[];
  patients: IPatient[] = [];
  patientsearch = new FormControl();
  filteredPatient: Observable<IPatient[]>;
  visitEntries: IVisitEntry[];
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
              private fb: FormBuilder,
              private router: Router,
              private physicalStateService: PhysicalStateService,
              private hospitalService: HospitalService,
              private visitEntryService: VisitEntriesCliantService,
              private patientService: PatientService) { 
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
    this.createphysicalStateAddForm();
  }

  createphysicalStateAddForm(){
    this.physicalStateAddForm = this.fb.group({
      patientId: ['', Validators.required],
      visitEntryId: [],
      bodyTemparature: [, [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      heightFeet: [],
      heightInches: [],
      bloodPressureSystolic: [, [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      bloodPressureDiastolic: [, [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      heartRate: [, [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      pulseRate: [, [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      spO2: [, [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      weight: [, [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]]
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
    this.visitEntryService.getAllCurrentDayVisitEntry().subscribe(response => {
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
  onSelectPatient(patient: IPatient){
    this.physicalStateAddForm.patchValue({patientId: patient.id});
    this.patientsearch.patchValue(patient.firstName);
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
