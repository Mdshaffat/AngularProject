import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IUserTokenProvider } from 'src/app/core/models/UserTokenProvider';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/patient', title: 'PATIENT',  icon: 'Patient', class: 'router-link-active' },
  { path: '/patient/history', title: 'PATIENT HISTORY',  icon: 'Patient', class: 'router-link-active' },
  { path: '/physicalstate', title: 'PHYSICAL STATE',  icon: 'physicalstate', class: 'router-link-active' },
  { path: '/medicine', title: 'MEDICINE',  icon: 'physicalstate', class: 'router-link-active' },
  { path: '/medicine/purchase', title: 'PURCHASE MEDICINE',  icon: 'physicalstate', class: 'router-link-active' },
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
  constructor(private toastr: ToastrService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.isAdmin$ = this.accountService.isAdmin$;
  }
  logout() {
    this.accountService.logout();
    this.toastr.success('Successfully Logout');
  }
}
