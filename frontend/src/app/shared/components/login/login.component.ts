import { Component, OnInit, OnDestroy, ViewChild, Inject, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { UserLogin } from 'src/app/shared/models/user-login.model';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;
  submited: boolean;
  returnUrl: string;
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private authenticationService: AuthorizationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(L10N_LOCALE) public locale: L10nLocale
  ) {
    if (this.authenticationService.token) {
      this.router.navigate(['/']);
    }
    this.submited = false;
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: new FormControl(
        '', [Validators.required]),
      password: new FormControl(
        '', [Validators.required])
    });
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {
    this.submited = true;
    const loginViewModel = this.loginForm.value as UserLogin;
    if (this.loginForm.valid){
      this.login(loginViewModel);
    }
  }

  login(loginViewModel: UserLogin): void {
    this.subscription.add(this.authenticationService
      .login(loginViewModel)
      .subscribe(
        res => {
          document.getElementById('closeModal').click();
          this.router.navigate(['']);
        },
        errors => this.errorMessage = errors.message)
    );
  }

  formIsValid(): boolean {
    return this.loginForm.status === 'VALID';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}