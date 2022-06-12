import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IUserTokenProvider } from 'src/app/core/models/UserTokenProvider';

interface RouteNode {
  name: string;
  path?: string;
  icon?: string;
  class?: string;
  children?: RouteNode[];
}

const TREE_DATA: RouteNode[] = [
  {
    name: 'Patient',
    children: [
      { path: '/patient/list', icon: 'wc' , name: 'Patient list', class: 'router-link-active'},
      { path: '/patient/history', icon: 'history', name: 'Patient history', class: 'router-link-active'},
      { path: '/report/followup', icon: 'bookmark', name: 'Followup', class: 'router-link-active'},
    ]
  },
  // {
  //   name: 'MEDICINE',
  //   children: [
  //     { path: '/medicine/list', icon: 'health_and_safety', name: 'MEDICINE LIST', class: 'router-link-active'},
  //    //  { path: '/medicine/purchase', icon: 'inventory', name: 'PURCHASE MEDICINE', class: 'router-link-active'},
  //   ]
  // },
  {
    name: 'Appoinment',
    children: [
      {path: '/visitentries/list', icon: 'date_range', name: 'Visit entries', class: 'router-link-active'},
      {path: '/prescription/list', icon: 'description', name: 'Prescription', class: 'router-link-active'},
    ]
  },
];
const TREE_DATA1: RouteNode[] = [
  {
    name: 'Report',
    children: [
      {path: '/report/countpatientbydate', icon: 'summarize', name: 'Patient tally report', class: 'router-link-active'},
      {path: '/report/countprescriptionbydate', icon: 'summarize', name: 'Prescription tally report', class: 'router-link-active'},
      {path: '/report/diagnosismonthlyreport', icon: 'summarize', name: 'Monthly disease report', class: 'router-link-active'},
      {path: '/report/medicalreport', icon: 'summarize', name: 'Medical report', class: 'router-link-active'},
      {path: '/report/telimedicinereport', icon: 'summarize', name: 'Telemedicine report', class: 'router-link-active'}
    ]
  },
];
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  // { path: '/patient/list', title: 'PATIENT',  icon: 'Patient', class: 'router-link-active' },
  // { path: '/patient/history', title: 'PATIENT HISTORY',  icon: 'Patient', class: 'router-link-active' },
  { path: '/physicalstate/list', title: 'Physical stat',  icon: 'physicalstate', class: 'router-link-active' },
  // { path: '/medicine/list', title: 'MEDICINE',  icon: 'physicalstate', class: 'router-link-active' },
 //  { path: '/medicine/purchase', title: 'PURCHASE MEDICINE',  icon: 'physicalstate', class: 'router-link-active' },
  // { path: '/visitentries/list', title: 'VISIT ENTRIES',  icon: 'physicalstate', class: 'router-link-active' },
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: any[];
  currentUser$: Observable<IUserTokenProvider>;
  isAdmin$: Observable<boolean>;
  isDoctor$: Observable<boolean>;

  // treeeee**************
    // tslint:disable-next-line: variable-name
    private _transformer = (node: RouteNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        ROUTES: node.path,
        icon: node.icon,
        level,
      };
    }
    // tslint:disable-next-line: member-ordering
    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => {
        return node.level;
      }, node => node.expandable);
    // tslint:disable-next-line: member-ordering
    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);
        // tslint:disable-next-line: member-ordering
        dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        dataSource1 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        // treeeee**************

  constructor(private toastr: ToastrService, private accountService: AccountService) {
                                                                  this.dataSource.data = TREE_DATA;
                                                                  this.dataSource1.data = TREE_DATA1;
                                                                }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.isAdmin$ = this.accountService.isAdmin$;
    this.isDoctor$ = this.accountService.isdesignationDoctor$;
  }
  logout() {
    this.accountService.logout();
    this.toastr.success('Successfully Logout');
  }
  // tree control methods
}
