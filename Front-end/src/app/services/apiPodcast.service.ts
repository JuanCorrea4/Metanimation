import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPodcastService {

  private urlApi = 'https://spotify23.p.rapidapi.com/podcast_episodes/?id=0ofXAdFIQQRsCYj9754UFx&offset=0&limit=50';

  private httpOptions = {
    method: 'GET',
    headers: new HttpHeaders({
      'X-RapidAPI-Key': '21b3734f66msh02d1db7a0cd2c9bp15a13ejsnbc68f6ab8429',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    })
  };

  constructor(private http: HttpClient) { }

  public getDataPodcast(): Observable<any> {
    return this.http.get<any>(this.urlApi, this.httpOptions);
  }
}
