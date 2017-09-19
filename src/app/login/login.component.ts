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
  error: string;
  user: any = {username: 'marcosgin291@gmail.com', password: 'godkhyzo10'};
  constructor( private _authService: AuthService,
               private router: Router ) {}

  ngOnInit() {
  }

  onSubmit() {
    this.processing = true;
    this._authService.login(this.user.username, this.user.password)
      .subscribe(response => {
      if (response.result === true) {
        this.router.navigate(['/admin']);
      } else {
        this.error = response.message;
        this.processing = false;
      }
    });
  }

}
