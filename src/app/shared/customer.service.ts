import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService{

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = "http://localhost:54703/api/"
  formModel = this.fb.group({
    CustomerEmail: ['',[Validators.email,Validators.required]],
    CustomerName: ['',Validators.required],
    DateOfBirth:[''],
    LicenseType:['Trial'],
    ExpiredDate:[''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if (confirmPasswordCtrl.errors == null || 'passwordMisMatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value !== confirmPasswordCtrl.value) {
        confirmPasswordCtrl.setErrors({ passwordMisMatch: true });
      }
      else {
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }
  register() {
    var body = {
      CustomerEmail: this.formModel.value.CustomerEmail,
      CustomerName: this.formModel.value.CustomerName,
      Password: this.formModel.value.Passwords.Password,
      LicenseType : this.formModel.value.LicenseType,
      DateOfBirth:this.formModel.value.DateOfBirth,
      ExpiredDate: this.formModel.value.ExpiredDate
    }
    return this.http.post(this.BaseURI + 'Customer/Register', body);
  }
  login(formData) {
    return this.http.post(this.BaseURI + 'Customer/login', formData);
  }
  getCustomerProfile() {

    return this.http.get(this.BaseURI + 'Customer');
  }
}
