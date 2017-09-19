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
    let titlee = window.location.pathname;
    function SplitTheString(ResultStr) {
      if (ResultStr != null) {
        const SplitChars = '/';
        if (ResultStr.indexOf(SplitChars) >= 0) {
          return ResultStr.split(SplitChars);
        }
      }
    }
    titlee = SplitTheString(titlee);
    if (typeof titlee[2] === 'undefined') {
      titlee[2] = 'home';
    }
    for (const routes of this.listRoutes) {
      if (routes.path === titlee[2]) {
          return routes.title;
      }
    }
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }

}
