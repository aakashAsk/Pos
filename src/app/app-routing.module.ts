import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './signin/login.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddExpenseComponent } from './add-expense/add-expens.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: ProductDisplayComponent},
  {path: 'add-products', component: AddProductComponent},
  {path: 'add-expenses', component: AddExpenseComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
