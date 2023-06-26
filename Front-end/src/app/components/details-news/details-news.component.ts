import { Component, OnInit } from '@angular/core';
import { ApiPodcastService } from 'src/app/services/apiPodcast.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-details-news',
  templateUrl: './details-news.component.html',
  template: 'El ID de la noticia es: {{ _id }}',
  styleUrls: ['./details-news.component.css']
})
export class DetailsNewsComponent implements OnInit {
  _id: string = "";
  public news: any = "";
  public description: any = "";
  public podcast: any = {};
  public podcastItems: any = {};
  safeUrl: any;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private apiService: ApiService, private apiPodcast: ApiPodcastService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this._id = idParam !== null ? idParam : '';
    this.llenarData()
    this.traerPodcast()
  }

  llenarData() {
    this.apiService.getnewById(this._id).subscribe(news => {
      this.news = news[0]
      this.description = this.news.Description.split("<br>")
      const url = this.news.videoURL;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }

  traerPodcast() {
    this.apiPodcast.getDataPodcast().subscribe(podcast => {
      this.podcast = podcast;
      this.podcastItems = this.podcast.data.podcastUnionV2.episodesV2.items
  
    })
  }

}
