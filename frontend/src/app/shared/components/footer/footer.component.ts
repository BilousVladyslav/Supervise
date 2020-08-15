import { Component, OnInit, Inject } from '@angular/core';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale) { }

  ngOnInit(): void {
  }

}
