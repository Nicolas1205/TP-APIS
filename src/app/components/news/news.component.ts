import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface News {
	title: string,
	subtitle: string,
	img: string,
}

@Component({
  selector: 'tranlate-component',
  standalone: true,
	providers: [HttpClient],
  imports: [FormsModule], 
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
	news: News[] = [];

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get<any>("https://livescore6.p.rapidapi.com/news/v2/list-by-sport", {
			headers: {
				'X-RapidAPI-Key': '7129e6cb40mshc5f5e8c740b6c5ap1dc6d9jsn1c9fbcfbf8d4',
				'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
			},
			params: {
				category: '2021020913321150030',
			}
		}).subscribe(result => {
				for(let article of result.data) {
					let news: News = { title: article.title, subtitle: article.body[0].data.content, img: article.image.data.urls.uploaded.original};
					this.news.push(news);
				}
		})
	}
}
