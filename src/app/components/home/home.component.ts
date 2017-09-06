import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: number = 2450;
  users: number = 145;
  buys: number = 42;
  errors: number = 23;


  constructor() { }

  ngOnInit() {
  }

}
