import { CartService } from '../../model & service/cart.service';
import { Cart } from './../../model & service/cart.model';
import { ProductService } from '../../model & service/product.service';
import { Product } from './../../model & service/product-data.model';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-product-list-display',
  styleUrls: ['./product-list-display.component.css'],
  templateUrl: './product-list-display.component.html'
})

export class ProductListDisplayComponent implements OnInit{
  ProductList: Product[] = [];
  price: number[] = [];
  cartItem: Cart;

  constructor(
    public productService: ProductService,
    public cartService: CartService
    ){}

  ngOnInit(): void {
    this.ProductList = this.productService.getProduct();
    this.productService.updateProductListner()
    .subscribe(
      (productlist) => {
       this.ProductList = productlist;
      },
      (error) => {
        console.error('something went wrong', error);
      }
    );
  }

  onAddItem(item: Product): void{
    const copyItem = {...item};
    this.cartService.addToCart(copyItem, parseInt(copyItem.price));
  }
}
