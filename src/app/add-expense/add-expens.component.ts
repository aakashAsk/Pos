import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './add-expens.component.html',
  styleUrls: ['./add-expens.component.css']
})

export class AddExpenseComponent implements OnInit{
  constructor(private route: Router){}
  ngOnInit(): void {
    if (localStorage.getItem('key') === null){
      this.route.navigateByUrl('/login');
    }
  }
}
