import { ExpenseService } from './../../model & service/expense.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../../model & service/expensive.model';

@Component({
  selector: 'app-display-expense',
  templateUrl: './display-expense.component.html',
  styleUrls: ['./display-expense.component.css']
})

export class DisplayExpenseComponent implements OnInit{

  ExpenseList: Expense[] = [];
  constructor(public expenseService: ExpenseService){}
  ngOnInit(): void{
    this.ExpenseList = this.expenseService.getExpenseList();
    this.expenseService.UpdateExpenseListListener()
    .subscribe((list) => {
      this.ExpenseList = list;
    });
  }
}
