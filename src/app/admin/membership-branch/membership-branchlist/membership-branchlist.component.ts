import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { MembershipBranchService } from '../membership-branch.service';

@Component({
  selector: 'app-membership-branchlist',
  templateUrl: './membership-branchlist.component.html',
  styleUrls: ['./membership-branchlist.component.css']
})
export class MembershipBranchlistComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['Name', 'Address', 'Upazila', 'District', 'Active', 'Action'];
  branches: IBranch[] = [];
  dataSource = new MatTableDataSource<IBranch>(this.branches);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private branchService: MembershipBranchService) { }
  ngOnInit(): void {
    this.getBranchList();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getBranchList(){
    this.branchService.getAllBranches().subscribe(response => {
      this.branches = response;
      this.dataSource.data = response;
    }, error => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
