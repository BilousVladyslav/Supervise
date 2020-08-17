import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import {
  L10nConfig,
  L10nLoader,
  L10nTranslationModule,
  L10nIntlModule
} from 'angular-l10n';
import { l10nConfig, initL10n } from './l10n/l10n-config';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WorkPlacesComponent } from './components/work-places/work-places.component';
import { AllAreasComponent } from './components/all-areas/all-areas.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    LoginComponent,
    RegistrationComponent,
    HomePageComponent,
    UserProfileComponent,
    WorkPlacesComponent,
    AllAreasComponent,
  ],
  imports: [
    L10nTranslationModule.forRoot(l10nConfig),
    L10nIntlModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initL10n,
      deps: [L10nLoader],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
