import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
@Injectable()
export class CategorysService {
  private categorys: Category [] = [
    {
      id: 1,
      name: 'Celular'
    },
    {
      id: 2,
      name: 'Notebook'
    },
    {
      id: 3,
      name: 'Televisor'
    }
  ];
  constructor() {}

  getCategorys() {
    return this.categorys;
  }
}
