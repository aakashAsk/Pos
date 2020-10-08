import { ExpenseService } from './../../model & service/expense.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-expense-form',
  templateUrl: './add-expense-form.component.html',
  styleUrls: ['./add-expense-form.component.css'],
})

export class AddExpenseFormComponent implements OnInit{
  form: FormGroup;
  error = false;
  constructor(private builder: FormBuilder, public expenseService: ExpenseService){}
  ngOnInit(): void{
    this.form = this.builder.group({
      title: ['', {validators: [Validators.required]}],
      date: [(new Date('dd/mm/yyyy')).toLocaleDateString(), {validators: [Validators.required]}],
      expenseList: this.builder.array([this.initRow()])
    });
  }
  get formArray(): any{
    return this.form.get('expenseList') as FormArray;
  }

  initRow(): any{
    return this.builder.group({
      expense: ['', {validators: [Validators.required]}],
      price: [Number, {validators:
        [
          Validators.required,
        ]}]
    });
  }

  addFeild(): void{
    this.formArray.push(this.initRow());
  }

  deleteFeild(i): void{
    this.formArray.removeAt(i);
  }

  submit(): void{
    if (this.form.invalid){
      this.error = true;
      console.log(this.form);
      setTimeout(() => {
      this.error = false;
      }, 3000);
      return;
    }
    console.log(this.form.value.date);
    // this.expenseService.addExpenseList(this.form.value);
  }
}
