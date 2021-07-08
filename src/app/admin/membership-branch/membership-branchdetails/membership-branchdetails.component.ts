import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { MembershipBranchService } from '../membership-branch.service';

@Component({
  selector: 'app-membership-branchdetails',
  templateUrl: './membership-branchdetails.component.html',
  styleUrls: ['./membership-branchdetails.component.css']
})
export class MembershipBranchdetailsComponent implements OnInit {
  branchDetails: IBranch;
  id: any;
  constructor(private activateRoute: ActivatedRoute, private branchService: MembershipBranchService) { }

  ngOnInit(): void {
    this.loadHospital();
  }
  loadHospital(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.branchService.getBranchById(this.id).subscribe(response => {
      console.log(response);
      this.branchDetails = response;
    }, error => {
      console.log(error);
    });
  }

}
