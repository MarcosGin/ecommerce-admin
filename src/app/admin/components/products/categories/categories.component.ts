import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {

  constructor( private location: Location ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
