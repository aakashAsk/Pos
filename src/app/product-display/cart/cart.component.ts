import { HttpClient } from '@angular/common/http';
import { CartService } from '../../model & service/cart.service';
import { Cart } from './../../model & service/cart.model';
import { Product } from './../../model & service/product-data.model';
import { ProductService } from 'src/app/model & service/product.service';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  getCartProduct: Subscription;
  getAllProduct: Subscription;
  cartItem: Cart[] = [];
  allProduct: Product[] = [];
  totalPrice = 0 ;
  rdbtn = 'cash';
  orderNo = 0;
  OrderOnHold = [];
  showHoldOrder = false;
  hidePanel = true;
  // tslint:disable-next-line: no-output-native
  @Output() error = new EventEmitter<any>();
  @Output() orderNoUpdate = new EventEmitter();

  constructor(
    public cartService: CartService,
    public productService: ProductService,
    public http: HttpClient) { }

  ngOnInit(): void {
    this.productService.updateProductListner()
    .subscribe((data) => {
      this.allProduct = data;
    });
    this.getCartProduct = this.cartService.addIntoCartListner()
    .subscribe((data) => {
      this.cartItem = data;
    });
    this.cartService.priceUpdateListener().subscribe((data) => {
      this.totalPrice = data;
    });
  }

  addClick(id): void{
    const item = this.allProduct.find(item => item.id === id);
    this.cartService.addBtn(id, parseInt(item.price));
  }

  rmvClick(id): void{
    const index = this.cartItem.findIndex(item => item.id === id);
    const item = this.allProduct.find(item => item.id === id);
    if (this.cartItem[index].cartValue === 1){
        this.cartService.deleteCartItem(id, item.price);
    }
    else{
      this.cartService.removeBtn(id, parseInt(item.price));
    }
  }

  placeOrder(totalPrice): void{
    let emptyArry;
    if (this.cartItem.length > 0){
      if (this.rdbtn !== undefined){
        this.cartService.insertCartInDatabase(this.cartItem, totalPrice, this.rdbtn);
        this.cartItem = [];
        this.totalPrice = 0 ;
        this.cartService.clearCart();
        this.cartService.ordernoUpdateListener().subscribe((data: any) => {
          this.orderNo = data.orderNo;
        });
      }
    }
    else{
      emptyArry = true;
      this.error.emit(emptyArry);
    }

  }
  cancelOrder(): void{
    this.cartItem = [];
    this.totalPrice = 0 ;
    this.cartService.clearCart();
  }
  // holdOrder(): void{
  //   const todayString: string = new Date().toDateString();
  //   const time = new Date().toLocaleTimeString('en-US', {
  //   hour: '2-digit',
  //   minute: '2-digit'});
  //   if (this.cartItem.length > 0){
  //     const order = {
  //       cartItem: this.cartItem,
  //       date: todayString + ' ' + time,
  //       totalPrice: this.totalPrice,
  //       paymentType: this.rdbtn,
  //     };
  //     this.OrderOnHold.push(order);
  //     this.hidePanel = false;
  //     this.cartService.clearCart();
  //   }
  // }
}
