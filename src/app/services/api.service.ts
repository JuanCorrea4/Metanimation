import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

   private urlNew = 'https://metanimation-back.onrender.com/api/Noticie';

  constructor(private http: HttpClient) { }

  public getData() : Observable<any>{
    return this.http.get<any>(this.urlNew);
  }

  public getnewById(_id: string) : Observable<any>{
    return this.http.get<any>(`${this.urlNew}/${_id}`);
  }
}
