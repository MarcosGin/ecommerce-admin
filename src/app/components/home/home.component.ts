import { Component, OnInit } from '@angular/core';
import { HomeService, ListProduct, ListMistake, StatisticsHome } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastProducts: ListProduct[] = [];
  lastMistakes: ListMistake[] = [];
  statistics: StatisticsHome[] = [];


  constructor( private _homeService: HomeService) { }

  ngOnInit() {
    this.lastProducts = this._homeService.getLastProducts();
    this.lastMistakes = this._homeService.getLastMistakes();
    this.statistics =   this._homeService.getStatistics();
  }

}
