import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor( private _authService: AuthService,
               private router: Router ) { }

  ngOnInit() {
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
    this._authService.logout();
    this.router.navigate(['/login']);
  }

}
