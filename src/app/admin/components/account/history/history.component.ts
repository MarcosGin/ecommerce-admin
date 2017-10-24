import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: []
})
export class HistoryComponent implements OnInit {

  constructor(private _accountService: AccountService) { }

  ngOnInit() {
    this._accountService.getHistory()
      .subscribe(data => {
        console.log(data.response);
      });
  }

}
