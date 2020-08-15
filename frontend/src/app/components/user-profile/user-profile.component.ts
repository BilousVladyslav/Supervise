import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProfileService } from '../../core/services/profile.service';
import { UserProfileModel } from '../../shared/models/user.profile.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NameRegex } from 'src/app/shared/regexes/name.regex';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: UserProfileModel = new UserProfileModel();
  userProfileForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(L10N_LOCALE) public locale: L10nLocale
  ) {
    authorizationService.isLoggedIn.subscribe(logged => {
      if (!logged){
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit(): void {
    this.GetUserProfile();
    this.CreateForm();
  }

  CreateForm(): void {
    this.userProfileForm = this.fb.group({
      first_name: new FormControl(
        '', [Validators.required, Validators.maxLength(50), Validators.pattern(NameRegex.Regex)]),
      last_name: new FormControl(
        '', [Validators.required, Validators.maxLength(50), Validators.pattern(NameRegex.Regex)]),
    });
  }

  GetUserProfile(): void {
    this.subscription = this.profileService.GetUserProfile()
      .subscribe(data => {
        this.user = data;
      });
  }

  EditUserProfile(): void {
    this.subscription = this.profileService.EditUserProfile(this.user)
      .subscribe(data => {
        this.user = data;
        this._snackBar.open('Success!', 'Close', {
          duration: 3000,
        });
      },
      error => {
        this._snackBar.open('Wrong data,', 'Close', {
          duration: 3000,
        });
      });
  }

  onSubmitProfile(): void {
    this.EditUserProfile();
  }


  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
