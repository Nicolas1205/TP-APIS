import { Component } from "@angular/core";
import { TranslateService } from "../../service/TranslateService";
import { Language } from "../../model/Language";
import { Translation } from "../../model/Translation";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'tranlate-component',
  standalone: true,
	providers: [TranslateService, HttpClient],
  imports: [FormsModule], 
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss'
})
export class TranslateComponent {
	languages: Language[] = [];
	target: string; 
	source: string;
	textToTranslate: string;
	public translation: Translation[];

	constructor(private translateService: TranslateService, private http: HttpClient) {
		this.target = "es";
		this.source = "en";
		this.textToTranslate = "";
		this.languages = this.translateService.getLanguages();
		this.translation = [{ translatedText: ""}]; 
	}

	public async translate() {

		const encodedParams = new URLSearchParams();
		encodedParams.set('source', this.source);
		encodedParams.set('target', this.target);
		encodedParams.set('q', this.textToTranslate);
		this.http.post<any>("https://google-translate1.p.rapidapi.com/language/translate/v2", encodedParams, { 
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'Accept-Encoding': 'application/gzip',
				'X-RapidAPI-Key': '7129e6cb40mshc5f5e8c740b6c5ap1dc6d9jsn1c9fbcfbf8d4',
				'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
			}
		}).subscribe(results => {
			this.translation = results.data.translations;
		});
	}
}
