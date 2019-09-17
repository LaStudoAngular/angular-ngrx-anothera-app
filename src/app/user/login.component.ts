import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { select, Store } from '@ngrx/store';
import { getMaskUserName, GlobalState } from './state/user.reducer';
import { MaskUserName } from './state/user.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;
  maskUserName: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<GlobalState>,
  ) {}

  // TODO: unsubscribe
  ngOnInit(): void {
    this.store
      .pipe(select(getMaskUserName))
      .subscribe((maskUserName: boolean) => (this.maskUserName = maskUserName));
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
