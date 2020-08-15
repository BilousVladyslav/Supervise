import { Component, Inject } from '@angular/core';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Supervise';

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private router: Router,
  ) { }
}
