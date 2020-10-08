import { RegistrationService } from './../model & service/registration.service';
import { User } from './../model & service/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  form: FormGroup;
  error = false;
  errorMsg = '';
  isLoadded = true;

  constructor(private route: Router, private user: RegistrationService){}
  ngOnInit(): void {
    if (localStorage.getItem('key') === null)
    {
      this.form = new FormGroup({
        email: new FormControl(null, {validators: [Validators.required]}),
        password: new FormControl(null, {validators: [Validators.required]})
      });
    }
    else
    {
      this.route.navigateByUrl('/');
    }
  }

  submit(): void
  {
    if (this.form.invalid){
      this.error = true;
      this.errorMsg = 'please fill all the inputs';
      setTimeout(() => {
        this.error = false;
      }, 3000);
      return;
    }
    else{
      this.user.login(this.form.value)
      .subscribe((result) => {
        console.log(result);
        if (result.done === true){
          console.log(result.details);
          localStorage.setItem('key', result.key);
          localStorage.setItem('details', JSON.stringify(result.details));
          this.route.navigateByUrl('/');
        }
        else{
          this.error = true;
          this.errorMsg = 'email or password does not match';
          setTimeout(() => {
            this.error = false;
          }, 3000);
        }
      });
    }
  }
}


