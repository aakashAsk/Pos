import { HttpClient } from '@angular/common/http';
import { Cart } from './cart.model';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartService{
  cartList: Cart[] = [];
  totalPrice = 0;
  addIntoCart = new Subject<Cart[]>();
  price = new Subject<number>();
  orderNo;
  orderNoSub = new Subject<number>();
  OrderOnHold = [];

  constructor(public http: HttpClient){}


  addIntoCartListner(): Observable<Cart[]>{
    return this.addIntoCart.asObservable();
  }

  priceUpdateListener(): Observable<number>{
    return this.price.asObservable();
  }

  ordernoUpdateListener(): Observable<number>{
    return this.orderNoSub.asObservable();
  }


  getCartItems(): any{
    return this.addIntoCart.next([...this.cartList]);
  }

  addToCart(cartItem, price: number): void{
    const itemInCart = this.cartList.find(item => item.id === cartItem.id);
    if (typeof itemInCart === 'object'){
      const index = this.cartList.findIndex(item => item.id === cartItem.id);
      this.cartList[index].cartValue += 1;
      this.cartList[index].price = (price + parseInt(this.cartList[index].price)).toString();
      this.totalPriceMethod(price);
    }
    else{
      const cart = {...cartItem, cartValue: 1};
      this.cartList.push(cart);
      const index = this.cartList.findIndex(item => item.id === cartItem.id);
      this.totalPriceMethod(price);
    }
    this.price.next(this.totalPrice);
  }

  addBtn(id, price: number): void{
    const itemInCart = this.cartList.find(item => item.id === id);
    const index = this.cartList.findIndex(item => item.id === id);
    this.cartList[index].cartValue += 1;
    this.cartList[index].price = (price + parseInt(this.cartList[index].price)).toString();
    this.totalPriceMethod(price);
    this.price.next(this.totalPrice);
  }

  removeBtn(id, price: number): void{
    const itemInCart = this.cartList.find(item => item.id === id);
    const index = this.cartList.findIndex(item => item.id === id);
    this.cartList[index].cartValue -= 1;
    this.cartList[index].price = (parseInt(this.cartList[index].price) - price).toString();
    this.subTotalPrice(price);
    this.price.next(this.totalPrice);
  }

  deleteCartItem(id, price): void{
    const items = this.cartList.filter(item => item.id !== id);
    this.cartList = items;
    this.addIntoCart.next([...this.cartList]);
    this.subTotalPrice(price);
    this.price.next(this.totalPrice);
  }

  totalPriceMethod(price: number): void{
    this.totalPrice += price;
    this.addIntoCart.next([...this.cartList]);
  }

  subTotalPrice(price: number): void{
    this.totalPrice -= price;
    this.addIntoCart.next([...this.cartList]);
  }

  insertCartInDatabase(cart: Cart[], totalPrice, paymentType): void{
    const todayString: string = new Date().toDateString();
    const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'});
    const cartItem = {
      cart,
      date: todayString + ' ' + time,
      totalPrice,
      paymentType,
    };

    this.http.post('http://localhost:3000/cart/api/post', cartItem).subscribe((data: any) => {
      this.orderNo = data.orderNo;
      this.orderNoSub.next(this.orderNo);
    });
  }

  getOrderNo(): any{
    this.http.get('http://localhost:3000/cart/api/get/orderno')
    .subscribe((no: any) => {
      this.orderNo = no.orderNo;
      this.orderNoSub.next(this.orderNo);
    });
    return this.orderNo;
  }

  clearCart(): void{
    this.cartList = [];
    this.addIntoCart.next([...this.cartList]);
    this.totalPrice = 0;
    this.price.next(this.totalPrice);
  }
}
