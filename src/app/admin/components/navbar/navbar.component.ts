import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {windowWhen} from "rxjs/operator/windowWhen";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private listRoutes: any = [
    {path: '', title: 'Home'},
    {path: 'home', title: 'Home'},
    {path: 'users', title: 'Users'},
    {path: 'products', title: 'Products'}
  ];
  public phoneDetected = false;
  public menuActive = false;
  constructor( private _authService: AuthService,
               private router: Router) {
    this.phoneDetected = window.innerWidth < 680;
    window.onresize = (e) => {
       this.phoneDetected = window.innerWidth < 680;
    };
  }

  ngOnInit() {
  }
  activeMenu() {
      this.menuActive = this.menuActive === false;
  }

  getTittle() {
    const path = window.location.pathname;
    function SplitTheString(ResultStr) {
      if (ResultStr != null) {
        const SplitChars = '/';
        if (ResultStr.indexOf(SplitChars) >= 0) {
          return ResultStr.split(SplitChars);
        }
      }
    }
    const pathList = SplitTheString(path);
    if (typeof pathList[2] === 'undefined') {
      pathList[2] = 'home';
    }
    for (const routes of this.listRoutes) {
      if (routes.path === pathList[2]) {
          return routes.title;
      }
    }
  }

  logout() {
    this._authService.logout()
      .subscribe(res => {
        this.router.navigate(['/login']);
      });
  }

}
