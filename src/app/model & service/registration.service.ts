import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService{

  constructor(public http: HttpClient){}

  registration(reg): any{
    return this.http.post('http://localhost:3000/user/api/post', reg);
  }

  login(login): any{
    console.log(login);
    return this.http.get('http://localhost:3000/user/api/get/' + login.email + '/' + login.password);
  }
}
