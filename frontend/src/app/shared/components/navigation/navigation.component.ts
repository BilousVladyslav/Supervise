import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import {
  L10N_CONFIG,
  L10nConfig,
  L10N_LOCALE,
  L10nLocale,
  L10nTranslationService
} from 'angular-l10n';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  schema = this.l10nConfig.schema;

  selectedLanguage = this.schema[0].locale;
  isLogged = false;

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
    private translation: L10nTranslationService,
    private router: Router,
    private autorizationService: AuthorizationService,
  ) {
    this.subscription.add(autorizationService.isLoggedIn.subscribe(x => this.isLogged = x));
   }

   ngOnInit(): void {
    this.subscription.add(this.translation.onError().subscribe({
      next: (error: any) => {
        if (error){
          console.log(error);
        }
      }
    }));
  }

  setLocale(locale: L10nLocale): void {
    this.translation.setLocale(locale);
  }

  logOut(): void {
    this.autorizationService.logout();
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
