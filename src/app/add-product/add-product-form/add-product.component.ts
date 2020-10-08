import { Product } from './../../model & service/product-data.model';
import { ProductService } from '../../model & service/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { isNumber } from './form.validators';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductFormComponent implements OnInit {
  imgPrev: string;
  form: FormGroup;
  productList: Product[] = [];
  fd: FormGroupDirective;
  productId: string;
  mode = 'add';
  isLoaded = false;
  btnName = 'Add Product';
  done = false;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null,
        {
        validators: [
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')
        ]
      }),
      code: new FormControl(null, {validators: [
        Validators.required,
        Validators.pattern('^#[0-9]*$')
      ]}),
      price: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]}),
      img: new FormControl(null, {
        validators: [
          Validators.required,
        ]})
    });

    this.productService.editProductCall()
    .subscribe((data) => {
      this.btnName = 'Edit Product';
      this.mode = 'edit';
      this.form.setValue({
        title: data[0].title,
        price: data[0].price,
        code: data[0].code,
        img: data[0].img,
      });
      this.imgPrev = data[0].img;
      this.productId = data[0].id;
      console.log(data);
    });
  }

  onChange(event): void{
    const img = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPrev = reader.result as string;
    };
    reader.readAsDataURL(img);
    this.form.patchValue({img});
    this.form.updateValueAndValidity();
  }

  onSubmit(): void{
    this.isLoaded = true;
    if (this.form.invalid){
      this.isLoaded = false;
      return;
    }
    this.done = !this.done;
    if (this.mode === 'add'){
      this.productService.addProduct(this.form.value);
      this.productService.updateProductListner()
      .subscribe((data) => {
        this.isLoaded = false;
      });
    }
    else{
      this.productService.editProductInfo(this.form.value, this.productId);
      this.productService.updateProductListner()
      .subscribe((data) => {
        this.isLoaded = false;
        console.log(data);
      });
    }
    this.form.reset();
    setTimeout(() => {
      this.done = ! this.done;
    }, 3000);
  }
}
