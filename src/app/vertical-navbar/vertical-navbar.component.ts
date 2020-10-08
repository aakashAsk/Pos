import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrls: ['./vertical-navbar.component.css']
})
export class VerticalNavbarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  logout(): void{
    localStorage.removeItem('details');
    localStorage.removeItem('key');
    this.route.navigateByUrl('/login');
  }
}
