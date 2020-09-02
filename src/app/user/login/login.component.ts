import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: CustomerService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token') !=null){
     this.router.navigate(['/home']);
    }
  }
  onSubmit(form: NgForm) {
    console.log(form);
    this.service.login(form.value).subscribe(
      (resp: any) => {
        localStorage.setItem('token', resp.token);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400) {
            this.toastr.error("Incorrect Username or password","Authentication failed");
        }
        else{
          console.log(err);
        }
      }
    )
  }
}
