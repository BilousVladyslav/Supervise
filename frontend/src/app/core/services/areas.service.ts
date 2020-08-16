import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaModel, CreateAreaModel } from '../../shared/models/area.model';


@Injectable({
  providedIn: 'root'
})
export class AreasService {


  controllerUrl: string = environment.apiURL + '/areas/';

  constructor(private http: HttpClient) {
  }


  GetAllAreas(): Observable<AreaModel[]> {
    return this.http
      .get<AreaModel[]>(this.controllerUrl);
  }

  SearchAreas(searchString: string): Observable<AreaModel[]> {
    const urlString = this.controllerUrl + '?search=' + searchString;
    return this.http
      .get<AreaModel[]>(urlString);
  }

  GetConcreteArea(id: string): Observable<AreaModel> {
    return this.http
      .get<AreaModel>(this.controllerUrl + id);
  }

  EditArea(area: CreateAreaModel, id: string): Observable<AreaModel> {
    return this.http
      .put<AreaModel>(this.controllerUrl + id, area);
  }

  CreatArea(area: CreateAreaModel): Observable<AreaModel> {
    return this.http
      .post<AreaModel>(this.controllerUrl, area);
  }

  DeleteArea(id: string): Observable<any> {
    return this.http
      .delete<any>(this.controllerUrl + id);
  }
}
