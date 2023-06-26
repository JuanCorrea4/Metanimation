import { Component, OnInit, ElementRef} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-news-meta',
  templateUrl: './news-meta.component.html',
  styleUrls: ['./news-meta.component.css']
})
export class NewsMetaComponent implements OnInit {

  constructor( public auth : AuthService, private elementReF:ElementRef) { }

  ngOnInit(): void {
  }
  rutas(ruta: string){
    const elementNews = this.elementReF.nativeElement.ownerDocument.querySelector(ruta)
    console.log(elementNews)
    elementNews.scrollIntoView({behavior: 'smooth'})
  }
}
