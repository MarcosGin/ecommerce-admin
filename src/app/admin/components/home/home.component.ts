import { Component, OnInit } from '@angular/core';
import { HomeService, ListMistake } from '../../../services/home.service';
import { StatisticsService, StatisticsHome } from '../../../services/statistics.service';
import { ProductsService } from '../../../services/products.service';
import { Products } from '../../../interfaces/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastProducts: Products [] = [];
  lastMistakes: ListMistake[] = [];
  statistics: StatisticsHome;

  constructor( private _homeService: HomeService,
               private _statisticsService: StatisticsService,
               private _productsService: ProductsService) {
    this.statistics = new StatisticsHome();
  }

  ngOnInit() {
    this._statisticsService.getStatistics()
      .subscribe(data => {
          this.statistics = data.response;
      }, err => console.log(err), () => {
        this._productsService.getProducts('desc', 5)
          .subscribe(data => {
            this.lastProducts = data.response;
          });
      });

    this.lastMistakes = this._homeService.getLastMistakes();
  }

}
