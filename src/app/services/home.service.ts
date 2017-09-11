import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  private productsNew: ListProduct [] = [
    {
      id: 1,
      title: 'Celular Motorola 4G liberado 16GB',
      created_at: 'four hour ago',
      category: '1'
    },
    {
      id: 2,
      title: 'Celular Samsung S3 4G liberado 8GB',
      created_at: 'three hours ago',
      category: '1'
    },
    {
      id: 3,
      title: 'Smart Tv SAMSUNG 48 UN48JU6700',
      created_at: 'two hours ago',
      category: ''
    },
    {
      id: 4,
      title: 'Notebook Lenovo Y700-15ISK 80NV003SAR',
      created_at: 'an hours ago',
      category: ''
    }
    ];
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
  private statistics: StatisticsHome [] = [
    {
      products: {
        size: 2450,
        updated_at: 'Updated now'
      },
      users: {
        size: 145,
        updated_at: 'In the last hour'
      },
      buys: {
        size: 42,
        updated_at: 'In the last hour'
      },
      mistakes: {
        size: 23,
        updated_at: 'In the last hour'
      }
    }
  ];


  constructor() {}


  getLastProducts() {
    return this.productsNew;
  }
  getLastMistakes() {
    return this.mistakesNew;
  }
  getStatistics() {
    return this.statistics;
  }
}

export interface ListProduct {
  id: number;
  title: string;
  created_at: string;
  category: string;
}
export interface ListMistake {
  id: number;
  title: string;
  created_at: string;
  state: string;
}
export interface StatisticsHome {
  products: {
    size: number,
    updated_at: string
  };
  users: {
    size: number,
    updated_at: string
  };
  buys: {
    size: number,
    updated_at: string
  };
  mistakes: {
    size: number,
    updated_at: string
  };
}


