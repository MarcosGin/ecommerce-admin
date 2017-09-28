import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public options = {
    position: ['bottom', 'right'],
    timeOut: 6000,
    lastOnBottom: true,
    showProgressBar: true
  };
  constructor() {
  }

  ngOnInit() {
  }



}
