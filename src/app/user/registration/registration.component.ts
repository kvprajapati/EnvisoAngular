import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {
  isLicenseDateEnable = false;
  constructor(public service: CustomerService, private toastr: ToastrService) { }
  birthDate = new FormControl(new Date());
  expiredDate = new FormControl(new Date());
  ngOnInit() {
    this.service.formModel.reset();
    this.service.formModel.get("LicenseType").valueChanges.subscribe(value => {
      this.onLicenseTypechange(value);
    })
  }
  onLicenseTypechange(selectedValue: string) {
    const expiredDateControl = this.service.formModel.get('ExpiredDate');
    this.isLicenseDateEnable =false;
    if (selectedValue !== "Trial") {
      this.isLicenseDateEnable =true;
      expiredDateControl.setValidators(Validators.required);
    }
    else {
      expiredDateControl.clearValidators();
    }
    expiredDateControl.updateValueAndValidity();
  }
  onSubmit() {
    if(this.service.formModel.valid){
      this.service.register().subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.service.formModel.reset();
            this.toastr.success("New user created", "Registration successful.");
          }
          else {
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error("Username is already taken", "Registration failed.");
                  break;
  
                default:
                  this.toastr.error(element.description, "Registration failed.");
                  break;
              }
            });
          }
        },
        err => {
          console.log(err)
        }
      )
    }
    else{
      this.toastr.error("Required validation", "Please fill all required fields");
    }
   
  }
}
