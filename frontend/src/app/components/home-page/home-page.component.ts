import { Component, OnInit, Inject } from '@angular/core';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale) { }

  ngOnInit(): void {
  }

}
