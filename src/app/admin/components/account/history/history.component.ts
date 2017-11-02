import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { PaginationService } from '../../../../services/pagination.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['../account.component.css']
})
export class HistoryComponent implements OnInit {

  public historySessions = [];
  public pagerHistories: any = {};
  public pagedHistories: any[];
  constructor(private _accountService: AccountService,
              private _paginationService: PaginationService) { }

  ngOnInit() {
    this._accountService.getHistory()
      .subscribe(data => {
       this.historySessions = data.response.sessions;
       this.setPageHistories(1);
      });
  }

  setPageHistories(page: number) {
    if (page < 1 || page > this.pagerHistories.totalPages) {
      return;
    }

    this.pagerHistories = this._paginationService.getPager(this.historySessions.length, page, 5);
    this.pagedHistories = this.historySessions.slice(this.pagerHistories.startIndex, this.pagerHistories.endIndex + 1);
  }

}
