import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoadInfoUserService {

  private url = "http://localhost:5000/api/Users"

  constructor(private http : HttpClient) { }

  public getInfo() : Observable<any>{
    return this.http.get<any>(this.url);
  }
}
