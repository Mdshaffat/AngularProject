import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPhysicalState } from 'src/app/core/models/PhysicalState/getPhysicalState';
import { PhysicalStateService } from '../physical-state.service';

@Component({
  selector: 'app-physical-state-details',
  templateUrl: './physical-state-details.component.html',
  styleUrls: ['./physical-state-details.component.css']
})
export class PhysicalStateDetailsComponent implements OnInit {
  physicalStateDetails: IPhysicalState;
  id: any;
  constructor(private activateRoute: ActivatedRoute,
              private physicalStateService: PhysicalStateService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadPhysicalState();
  }


  loadPhysicalState(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.physicalStateService.getPhysicalStateById(this.id).subscribe(response => {
      console.log(response);
      this.physicalStateDetails = response;
    }, error => {
      console.log(error);
    });
  }
}

