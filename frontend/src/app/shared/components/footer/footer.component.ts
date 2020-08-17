import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  isLogged = false;

  constructor(
    private authorizationService: AuthorizationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale
  ) {
    this.subscriptions.add(authorizationService.isLoggedIn.subscribe(
      logged => this.isLogged = logged
    ));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
