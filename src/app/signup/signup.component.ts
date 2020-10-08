import { Router, Routes } from '@angular/router';
import { RegistrationService } from './../model & service/registration.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent implements OnInit{
  form: FormGroup;
  error = false;
  errorMsg = '';
  isLoadded = true;

  constructor(private regService: RegistrationService, private router: Router){}
  ngOnInit(): void {
    if (localStorage.getItem('key') === null){
      this.form = new FormGroup({
        name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
        email: new FormControl(null, {validators: [Validators.required]}
        ),
        number: new FormControl(null, {validators:
          [Validators.required, Validators.pattern('^[0-9]{10}')]
        }),
        code: new FormControl(null, {validators:
          [Validators.required, Validators.pattern('^#[0-9]*$')]
        }),
        password: new FormControl(null, {validators:
          [Validators.required]
        }),
        conPassword: new FormControl(null, {validators:
          [Validators.required]
        })
      });
    }
    else{
      this.router.navigateByUrl('/');
    }
  }

  submit(pass, conPass): void{
    if (this.form.invalid){
      this.error = true;
      this.errorMsg = 'Please fill all the input';
      setTimeout(() => {
        this.error = false;
      }, 3000);
      return;
    }
    else{
      if (conPass.value === pass.value){
        this.regService.registration(this.form.value)
        .subscribe((data) => {
          console.log(data);
          if (data.done === false){
            console.log(data.done);
            this.error = true;
            this.errorMsg = data.msg;
          }
          else{
            this.error = false;
            this.isLoadded = true;
            localStorage.setItem('key', data.token);
            localStorage.setItem('details', JSON.stringify(data.details));
            this.router.navigateByUrl('/');
          }
        });
      }
      else{
        this.error = true;
        this.errorMsg = 'password does not match';
      }
    }
  }
}
