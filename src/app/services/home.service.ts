import { Injectable } from '@angular/core';

import { ProductsService } from './products.service';

@Injectable()
export class HomeService {
  private mistakesNew: ListMistake [] = [
    {
      id: 4521,
      title: 'Product # 023123, does not have your images',
      created_at: 'six hours ago',
      state: 'fixing'
    },
    {
      id: 4522,
      title: 'Product # 213151, does not have your price',
      created_at: 'three hours ago',
      state: 'fixed'
    },
    {
      id: 4526,
      title: 'Product # 020123, does not exist on the web',
      created_at: 'an hour ago',
      state: 'pending'
    }
  ];

  constructor( private _productsService: ProductsService ) {}

  getLastMistakes() {
    return this.mistakesNew;
  }
}
export interface ListMistake {
  id: number;
  title: string;
  created_at: string;
  state: string;
}



