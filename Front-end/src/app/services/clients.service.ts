import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Person } from '../interface/Person';
import { Login } from '../interface/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  ApiPerson='http://localhost:5000/api/Users/'

  constructor(private http: HttpClient) {}


  CreatePerson(Person:Person):Observable<any>{
    return this.http.post<Person>(this.ApiPerson+'SignUp',Person)
  }
  login(login: Login): Observable<any> {
    return this.http.post<Login>(this.ApiPerson + 'SignIn', login);
  }
  
  getRequest(route: string, queries?: Record<string, string>, headers?: Record<string, string>) {
    let reqHeaders = new HttpHeaders();
    let reqParams = new HttpParams();

    if (headers) {
      Object.getOwnPropertyNames(headers).forEach((key) => {
        reqHeaders = reqHeaders.set(key, headers[key]);
      });
    }

    if (queries) {
      Object.getOwnPropertyNames(queries).forEach((key) => {
        reqParams = reqParams.set(key, queries[key]);
      });
    }

    return this.http.get(route, {
      headers: reqHeaders,
      params: reqParams,
      responseType: "json",
      withCredentials: true,
    });
  }


  postRequest(route: string, data?: any, queries?: Record<string, string>, headers?: Record<string, string>) {
    let reqHeaders = new HttpHeaders();
    let reqParams = new HttpParams();

    if (headers) {
      Object.getOwnPropertyNames(headers).forEach((key) => {
        reqHeaders = reqHeaders.set(key, headers[key]);
      });
    }

    if (queries) {
      Object.getOwnPropertyNames(queries).forEach((key) => {
        reqParams = reqParams.set(key, queries[key]);
      });
    }

    return this.http.post(route, data, {
      headers: reqHeaders,
      params: reqParams,
      responseType: "json",
      withCredentials: true,
    });
  }
}
