import { Component, OnInit } from '@angular/core';
import { HomeService, ListMistake } from '../../../services/home.service';
import { StatisticsService, StatisticsHome } from '../../../services/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastProducts = [];
  lastMistakes: ListMistake[] = [];
  statistics: StatisticsHome;


  constructor( private _homeService: HomeService,
               private _statisticsService: StatisticsService) {
    this.statistics = new StatisticsHome();
  }

  ngOnInit() {
    this._statisticsService.getStatistics()
      .subscribe(data => {
          this.statistics = data.response;
      });

    this.lastMistakes = this._homeService.getLastMistakes();
  }

}
