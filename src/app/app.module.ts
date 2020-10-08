import { LoginComponent } from './signin/login.component';
import { SignUpComponent } from './signup/signup.component';
import { DisplayExpenseComponent } from './add-expense/display-expense/display-expense.component';
import { AddExpenseComponent } from './add-expense/add-expens.component';
import { ProductListDisplayComponent } from './product-display/product-list-display/product-list-display.component';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { CartComponent } from './product-display/cart/cart.component';
import { AddProductFormComponent } from './add-product/add-product-form/add-product.component';
import { ProductListComponent } from './add-product/product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ChartsComponent } from './charts/charts.component';


import { WishPipe } from '../app/product-display/wish.pipe';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './model & service/material.class';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AddExpenseFormComponent } from './add-expense/add-expense-form/add-expense-form.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    VerticalNavbarComponent,
    ProductDisplayComponent,
    CartComponent,
    AddProductFormComponent,
    ProductListComponent,
    AddProductComponent,
    ProductListDisplayComponent,
    ChartsComponent,
    AddExpenseFormComponent,
    AddExpenseComponent,
    DisplayExpenseComponent,
    LoginComponent,
    SignUpComponent,
    WishPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
