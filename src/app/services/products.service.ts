import { Injectable } from '@angular/core';
import { ListProduct } from './home.service';
import { Products } from '../interfaces/products';

@Injectable()
export class ProductsService {
  private products: Products [] = [
    {
      id: 1,
      title: 'Celular Motorola 4G liberado 16GB',
      description: 'its is my description',
      category: 'celular',
      mark: 'motorola',
      price: 1700,
      stock: 120,
      created_at: 'four hour ago',
      updated_at: 'now',
    },
    {
      id: 2,
      title: 'Smart Tv SAMSUNG 48 UN48JU6700',
      description: 'its is my description',
      category: 'televisor',
      mark: 'samsung',
      price: 8700,
      stock: 47,
      created_at: 'six hour ago',
      updated_at: 'yesterday',
    },
    {
      id: 3,
      title: 'Notebook Lenovo Y700-15ISK 80NV003SAR',
      description: 'its is my description',
      category: 'notebook',
      mark: 'lenovo',
      price: 13000,
      stock: 23,
      created_at: 'three hour ago',
      updated_at: 'yesterday',
    },
  ];
  private lastProductsList: ListProduct [] = [
    {
      id: 1,
      title: 'Celular Motorola 4G liberado 16GB',
      category: 'celular',
      created_at: 'six hour ago'
    },
    {
      id: 2,
      title: 'Smart Tv SAMSUNG 48 UN48JU6700',
      category: 'televisor',
      created_at: 'six hour ago'
    },
    {
      id: 3,
      title: 'Notebook Lenovo Y700-15ISK 80NV003SAR',
      category: 'celular',
      created_at: 'six hour ago'
    },
  ];

  constructor () {}

  getProducts() {
    return this.products;
  }

  getLastProductsList() {
    return this.lastProductsList;
  }

}
