import { Product } from '../../model & service/product-data.model';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/model & service/product.service';
import { Subscription } from 'rxjs';

@Component({
  styleUrls: ['./product-list.component.css'],
  templateUrl: './product-list.component.html',
  selector: 'app-product-list',
})

export class ProductListComponent implements OnInit, OnDestroy{
  productList: Product[] = [];
  isLoaded = false;
  productSub: Subscription;

  constructor(public productService: ProductService){}
  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoaded = true;
    this.productList = this.productService.getProduct();
    this.productSub = this.productService.updateProductListner()
    .subscribe((data: Product[]) => {
      this.productList = data;
      setTimeout(() => {
       this.isLoaded = false;
      }, 3000);
    });
  }

  onDelete(id): void{
    this.productService.deleteProduct(id);
  }

  onEdit(productId): void{
    this.productService.editProduct(productId);
  }
}
