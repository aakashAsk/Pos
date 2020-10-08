import { Subject, Observable } from 'rxjs';
import { Expense } from './expensive.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService{
  constructor(public http: HttpClient){}

  ExpenseList: Expense[] = [];
  updateExpenseList = new Subject<Expense[]>();

  UpdateExpenseListListener(): Observable<Expense[]>{
    return this.updateExpenseList.asObservable();
  }

  addExpenseList(list: Expense): void{
    this.http.post('http://localhost:3000/expense/api/post', list)
    .subscribe((result: any) => {
      this.ExpenseList.push(result);
      this.updateExpenseList.next([...this.ExpenseList]);
    });
  }

  getExpenseList(): any{
    return this.http.get('http://localhost:3000/expense/api/get')
    .subscribe((result: any) => {
      this.ExpenseList = result;
      this.updateExpenseList.next([...this.ExpenseList]);
    });
  }
}
