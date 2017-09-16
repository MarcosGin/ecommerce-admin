import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  processing: boolean = false;
  user: any = {username: 'admin', password: 'admin1'};
  constructor( private _authService: AuthService,
               private router: Router ) {}

  ngOnInit() {
  }

  onSubmit() {
    this.processing = true;
    const result = this._authService.login(this.user.username, this.user.password);

    if (result === true) {
      this.router.navigate(['/admin']);
    } else {
      console.info(result);
      this.processing = false;
    }
  }

}
