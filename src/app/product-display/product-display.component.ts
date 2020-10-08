import { HttpClient } from '@angular/common/http';
import { CartService } from './../model & service/cart.service';
import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css'],
  animations: [
    trigger('showHide', [
      // ...
      state('show', style({
        opacity: 1, transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0, transform: 'translateY(-56px)'
      })),
      transition('show => hide', [
        animate('.4s')
      ]),
      transition('hide => show', [
        animate('.4s')
      ]),
    ]),
  ],
})
export class ProductDisplayComponent implements OnInit{
  menuItems: any[];
  totalPrice: number;
  Items: any[] = [];
  orderNo;
  no;
  emptyArray = false;
  animate = false;
  name;

  todayString: string = new Date().toDateString();
  time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'});
  timeSlot = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'});

  constructor(public cartService: CartService, public http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    const item = JSON.parse(localStorage.getItem('details'));
    if (localStorage.getItem('key') !== null){
      this.name = item.name;
      this.orderNo = this.cartService.getOrderNo();
      this.cartService.ordernoUpdateListener().subscribe((no) => {
        this.orderNo = no;
      });
      setInterval(() => {
        this.time = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'});
      }, 1000);

      setInterval(() => {
        this.time = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'});
      }, 360000);
    }
    else{
      this.route.navigateByUrl('/login');
    }
  }

  onError(event): void{
    this.toggle();
    setTimeout(() => {
      this.emptyArray = false;
    }, 3000);
  }

  toggle(): void{
    this.emptyArray = !this.emptyArray;
  }
}
