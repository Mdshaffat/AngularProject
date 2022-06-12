import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPatientForSearch } from 'src/app/core/models/Patient/patientForSearch';
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
  title = 'Add Physical Stat';
  patientid: number;
  patientName: string;
// this.param1= this.route.snapshot.queryParamMap.get('param1');
// this.param1= this.route.snapshot.queryParamMap.get('param2');
  physicalStateAddForm: FormGroup = new FormGroup({});
  hospitals: IHospital[];
  patients: IPatientForSearch[] = [];
  patientsearch = new FormControl();
  filteredPatient: Observable<IPatientForSearch[]>;
  visitEntries: IVisitEntry[];
  minLengthTerm = 3;
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
              private activatedroute: ActivatedRoute,
              private physicalStateService: PhysicalStateService,
              private hospitalService: HospitalService,
              private visitEntryService: VisitEntriesCliantService,
              private patientService: PatientService) {
                this.patientsearch.valueChanges
                .pipe(
                  filter(res => {
                    return res !== null && res.length >= this.minLengthTerm
                  }),
                  distinctUntilChanged(),
                  debounceTime(1500),
                  tap(() => {
                    this.patients = [];
                  }),
                  switchMap(value => this.patientService.getPatientForSearch(value)
                  )).subscribe(res => {
                    this.patients = res;
                  })
              }

  ngOnInit(): void {
    this.loadHospital();
    // this.loadPatient();
    this.loadVisitEntries();
    this.createphysicalStateAddForm();
    if (this.activatedroute.snapshot.paramMap.get('patientid') && this.activatedroute.snapshot.paramMap.get('name')) {
      // this.physicalStateAddForm.controls.patientId.patchValue( +this.activatedroute.snapshot.paramMap.get('patientid'));
      // this.patientsearch.patchValue(this.activatedroute.snapshot.paramMap.get('name'));
      this.patientid = +this.activatedroute.snapshot.paramMap.get('patientid');
      this.patientName = this.activatedroute.snapshot.paramMap.get('name');
      if (this.patientName !== null && this.patientid !== null) {
          this.physicalStateAddForm.controls.patientId.patchValue(this.patientid);
          this.patientsearch.patchValue(this.patientName);
        }
    }
  }

  createphysicalStateAddForm(){
    this.physicalStateAddForm = this.fb.group({
      patientId: ['', Validators.required],
      visitEntryId: [],
      bodyTemparature: [, [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      appearance: [ , Validators.maxLength(10)],
      anemia: [ , Validators.maxLength(10)],
      jaundice: [ , Validators.maxLength(10)],
      dehydration: [ , Validators.maxLength(10)],
      edema: [ , Validators.maxLength(10)],
      cyanosis: [ , Validators.maxLength(10)],
      kub: [ , Validators.maxLength(10)],
      rbsFbs: [ , Validators.maxLength(20)],
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
  // loadPatient(search: string){
  //   this.patientService.getPatientForSearch(search).subscribe(response => {
  //     this.patients = response;
  //   });
  // }
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
  onSelectPatient(patient: IPatientForSearch){
    this.physicalStateAddForm.patchValue({patientId: patient.id});
    this.patientsearch.patchValue(patient.firstName + ' ' + patient.lastName);
    }
  // private _filterPatient(value: string): IPatientForSearch[] {
  //   const filterValue = value.toLowerCase();
  //   this.loadPatient(filterValue);
  //   return this.patients;
  //   // const result = this.patients.filter(
  //   //   (p) =>
  //   //     p.firstName?.toLowerCase().includes(filterValue) ||
  //   //     p.lastName?.toLowerCase().includes(filterValue) ||
  //   //     p.mobileNumber?.toLowerCase().includes(filterValue)
  //   // );
  //   // return result;
  // }

  varifyPatient() {
    if(+this.physicalStateAddForm.controls.patientId.value >= 1)
      {
        this.patientService.getPatientForSearchById(+this.physicalStateAddForm.controls.patientId.value).subscribe(res => {
          this.onSelectPatient(res);
        }, err => {
          if(err.error.statusCode === 404)
          {
            this.toastr.error("Patient Not Found");
          } else {
 
            this.toastr.error(err.error.message);
          }
        })
     
      } else {
        this.toastr.error('please Input valid Patient Id')
      }
   }

  gotolist() {
    this.router.navigateByUrl('/physicalstate/list');
  }
}
