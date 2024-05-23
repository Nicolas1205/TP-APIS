import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Language } from './model/Language';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
	public languages: Language[] = [];

	constructor(private http: HttpClient) {
		
	}

	public getProducts()  {
		this.http.get<any>('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', {
			headers: { 
				'X-RapidAPI-Key': '7129e6cb40mshc5f5e8c740b6c5ap1dc6d9jsn1c9fbcfbf8d4',
			}
		}).subscribe(data => {
			this.languages = data.data.languages as Language[];
		});

	}

	ngOnInit() {
		this.getProducts();
	}

}
