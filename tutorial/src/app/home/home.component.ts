import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  baseUrl: string = 'http://localhost:3000';
  clothesController: string = '/clothes';

  onProductOutput = (product: Product) => {
    console.log(product, 'Output');
  };

  onPageChange = (event: any) => {
    this.fetchProducts(event.page, event.rows);
  };

  fetchProducts = (page: number, perPage: number) => {
    this.productsService
      .getProducts(`${this.baseUrl}${this.clothesController}`, {
        page,
        perPage,
      })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

  editProduct = (product: Product, id: number) => {
    this.productsService
      .addProduct(`${this.baseUrl}}${this.clothesController}/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.log(error),
      });
  };

  deleteProduct = (id: number) => {
    this.productsService
      .deleteProduct(`${this.baseUrl}}${this.clothesController}/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

  addProduct = (product: Product) => {
    this.productsService
      .addProduct(`${this.baseUrl}}${this.clothesController}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
