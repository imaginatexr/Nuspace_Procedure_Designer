import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    //get return url from router
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submitted
    this.alertService.clear();

    //stop if form invalid
    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    //this.router.navigateByUrl('/unAuthorized');

    let encryptPassword = this.encryptPassword(this.f.password.value);
    this.authenticationService.login(this.f.userName.value, encryptPassword)
    .pipe(first())
    .subscribe(
      data => {
        if(data.message != null && data.message != 'undefined')
        {
          if (data.message.includes("Rate limit exceeded")) {
            alert("Rate limit exceeded. Try again later.");
            this.loading = false;
            return;
                    }          
                  }
        if(data.ErrorMessage != null || data.AccessToken == null)
        {
          this.router.navigateByUrl('/unAuthorized');
          return ;
        }
        this.router.navigateByUrl('/app-bpmn-viewer-file');
      },
      error => {
        this.router.navigateByUrl('/unAuthorized');
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

    encryptPassword(plainText: string): string {
      const SECRET_KEY = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-char key
const IV = CryptoJS.enc.Utf8.parse('6543210987654321');         // 16-char IV

    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainText),
      SECRET_KEY,
      {
        keySize: 128 / 8,
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
  
    
    return encrypted.toString(); // Base64 format
  }
}