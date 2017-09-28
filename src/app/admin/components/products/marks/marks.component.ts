import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styles: []
})
export class MarksComponent implements OnInit {

  constructor( private location: Location ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
