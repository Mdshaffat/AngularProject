import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPrenantProfile } from 'src/app/core/models/pregnancyModel/pregnatProfile';
import { PregnancyService } from '../pregnancy.service';

@Component({
  selector: 'app-pregnancy-details',
  templateUrl: './pregnancy-details.component.html',
  styleUrls: ['./pregnancy-details.component.css']
})
export class PregnancyDetailsComponent implements OnInit {
  title = 'Profile';
  pregnantProfile: IPrenantProfile;
  id: any;
  constructor(private activateRoute: ActivatedRoute, 
              private pregnancyServic: PregnancyService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.pregnancyServic.getPregnantProfileById(this.id).subscribe(response => {
      console.log(response);
      this.pregnantProfile = response;
    }, error => {
      console.log(error);
    });
  }

}
