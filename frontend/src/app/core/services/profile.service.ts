import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileModel, ChangeEmail, ChangePassword } from '../../shared/models/user.profile.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  controllerUrl: string = environment.apiURL + '/profile/';

  constructor(private http: HttpClient) {
  }


  GetUserProfile(): Observable<UserProfileModel> {
        return this.http
          .get<UserProfileModel>(this.controllerUrl);
  }

  EditUserProfile(profile: UserProfileModel): Observable<UserProfileModel> {
        return this.http
          .put<UserProfileModel>(this.controllerUrl, profile);
  }

  ChangePassword(passwords: ChangePassword): Observable<any> {
    return this.http
      .put<any>(environment.apiURL + '/password/', passwords);
  }

  ChangeEmail(email: ChangeEmail): Observable<any> {
    return this.http
      .post<any>(environment.apiURL + '/email/', email);
  }

  DeleteUserProfile(): Observable<UserProfileModel> {
    return this.http
      .delete<UserProfileModel>(this.controllerUrl);
  }
}
