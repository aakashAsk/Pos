import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit{
  constructor(private route: Router){}
  ngOnInit(): void {
    if (localStorage.getItem('key') === null){
      this.route.navigateByUrl('/login');
    }
  }

}
