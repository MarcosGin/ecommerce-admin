import { Component, OnInit } from '@angular/core';
import { StatisticsService, StatisticsHome } from '../../../services/statistics.service';
import { MistakesService, Mistakes} from '../../../services/mistakes.service';
import { ProductsService } from '../../../services/products.service';
import { PaginationService } from '../../../services/pagination.service';
import { Products } from '../../../interfaces/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastProducts: Products [] = [];
  mistakes: Mistakes [] = [];
  statistics: StatisticsHome;
  pagerMistakes: any = {};
  pagedMistakes: any[];

  constructor( private _statisticsService: StatisticsService,
               private _mistakesService: MistakesService,
               private _productsService: ProductsService,
               private _paginationService: PaginationService) {
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
          }, err => console.log(err), () => {
            this._mistakesService.getMistakes()
              .subscribe(data => {
                this.mistakes = data.response;
                this.setPageMistakes(1);
              });
          });
      });
  }

  setPageMistakes(page: number) {
    if (page < 1 || page > this.pagerMistakes.totalPages) {
      return;
    }

    this.pagerMistakes = this._paginationService.getPager(this.mistakes.length, page, 5);
    this.pagedMistakes = this.mistakes.slice(this.pagerMistakes.startIndex, this.pagerMistakes.endIndex + 1);
  }


}
