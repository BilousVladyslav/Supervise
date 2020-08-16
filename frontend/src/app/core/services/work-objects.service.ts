import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkObjectModel, CreateWorkObjectModel } from '../../shared/models/work-object.model';


@Injectable({
  providedIn: 'root'
})
export class WorkObjectsService {


  controllerUrl: string = environment.apiURL + '/workplaces/';

  constructor(private http: HttpClient) {
  }


  GetWorkObjects(): Observable<WorkObjectModel[]> {
    return this.http
      .get<WorkObjectModel[]>(this.controllerUrl);
  }

  GetConcreteWorkObject(id: string): Observable<WorkObjectModel> {
    return this.http
      .get<WorkObjectModel>(this.controllerUrl + id);
  }

  EditWorkObject(workObject: CreateWorkObjectModel, id: string): Observable<WorkObjectModel> {
    return this.http
      .put<WorkObjectModel>(this.controllerUrl + id, workObject);
  }

  CreateWorkObject(workObject: CreateWorkObjectModel): Observable<WorkObjectModel> {
    return this.http
      .post<WorkObjectModel>(this.controllerUrl, workObject);
  }

  DeleteWorkObject(id: string): Observable<any> {
    return this.http
      .delete<any>(this.controllerUrl + id);
  }
}
