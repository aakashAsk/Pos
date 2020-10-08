import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './product-data.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService{
  productList: Product[] = [];
  product = new Subject<Product[]>();
  editProductId = new Subject<Product[]>();

  constructor(public http: HttpClient){}

  updateProductListner(): Observable<Product[]>{
    return this.product.asObservable();
  }

  editProductCall(): Observable<Product[]>{
    return this.editProductId.asObservable();
  }

  getProduct(): any{
    return this.http.get<{product: any}>('http://localhost:3000/api/product')
    .pipe(map((data) => {
      return data.product.map((product) => {
        return {
          title: product.title,
          price: product.price,
          code: product.code,
          id: product._id,
          img: product.img
        };
      });
    }))
    .subscribe((data) => {
      this.productList = data;
      this.product.next([...this.productList]);
    });
  }

  addProduct(prod: Product): void{
    const formData = new FormData();
    formData.append('title', prod.title);
    formData.append('code', prod.code);
    formData.append('price', prod.price);
    formData.append('img', prod.img);
    this.http.post<{message: string, product: any}>('http://localhost:3000/api/product', formData)
    .subscribe((data) => {
      const item = {
        title: prod.title,
        price: prod.price,
        code: prod.code,
        img: data.product.img,
        id: data.product.id,
      };
      this.productList.push(item);
      this.product.next([...this.productList]);
    });
  }

  deleteProduct(productId: string): void{
    this.http.delete('http://localhost:3000/api/product/' + productId)
    .subscribe((data) => {
      const deletedPost = this.productList.filter(product => productId !== product.id);
      this.productList = deletedPost;
      this.product.next([...this.productList]);
    });
  }

  editProduct(productid): void{
    const product = this.productList.filter(prod => productid === prod.id);
    this.editProductId.next(product);
  }

  editProductInfo(product: Product, productid): void{
    let productItemEdit: FormData | Product;
    if (typeof(product.img) === 'object'){
      productItemEdit = new FormData();
      productItemEdit.append('id', productid);
      productItemEdit.append('title', product.title);
      productItemEdit.append('code', product.code);
      productItemEdit.append('price', product.price);
      productItemEdit.append('img', product.img);
    }
    else{
      productItemEdit = {
        id: productid,
        title: product.title,
        price: product.price,
        code: product.code,
        img: product.img,
      };
    }
    this.http.put<{message: string, product: any}>('http://localhost:3000/api/product/' + productid, productItemEdit)
    .subscribe((data) => {
      const updatedProductList = [...this.productList];
      const index = this.productList.findIndex(a => a.id === productid);
      const uprod = this.productList[index];
      const up = {
        id: productid,
        title: product.title,
        price: product.price,
        code: product.code,
        img: data.product.img,
      };
      updatedProductList[index] = up;
      this.product.next([...updatedProductList]);
    });
  }
}
