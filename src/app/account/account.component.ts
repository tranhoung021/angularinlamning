import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private formBuilder: FormBuilder) {

  }

  isLoggedIn: boolean = this.cookieService.check('isLoggedIn')
  //edit: boolean = this.cookieService.check('editUserInfo')
  public user = {}

  ngOnInit() {
    this.authService.getUser().subscribe(data => this.user = data);
    this.updateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      addressline: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      password: ['']
    })

    this.authService.getUser().subscribe(data => {
      this.updateForm.patchValue(data)
      this.updateForm.controls["password"].setValue('')
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.cookieService.deleteAll();
  }
  updateForm: FormGroup;
  isSubmitted: boolean = false;



  updateUser() {
    this.isSubmitted = true;
    console.log("1")
    if (this.updateForm.invalid) {
      console.log("2")
      return;

    } console.log("3")

    this.authService.updateUser(this.updateForm.value).subscribe((updateres) => {
      if (updateres["success"]) {
        console.log("4")
        window.alert("User info was updated")

      }
      else {
        console.log("5")
        window.alert("User info was not updated");
      }
    })
  }



}
