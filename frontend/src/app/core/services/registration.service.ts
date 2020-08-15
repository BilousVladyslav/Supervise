import { RegistrationModel, RegistrationResponseModel } from '../../shared/models/registration.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(registerViewModel: RegistrationModel): Observable<RegistrationResponseModel> {
    return this.http.post<RegistrationResponseModel>(environment.apiURL + `/register/`, registerViewModel);
  }
}
