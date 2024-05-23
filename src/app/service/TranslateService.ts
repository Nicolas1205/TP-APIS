import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Language } from "../model/Language";
import { Translation } from "../model/Translation";

@Injectable({
	providedIn: 'root'
})
export class TranslateService {

	public getLanguages(): Language[]  {
		let languages: Language[] = [];
		this.http.get<any>('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', {
			headers: { 
				'X-RapidAPI-Key': '7129e6cb40mshc5f5e8c740b6c5ap1dc6d9jsn1c9fbcfbf8d4',
			}
		}).subscribe(data => {
			languages = data.data.languages as Language[];
		});
		return languages;
	}
	public translateText(source: string, target: string, text: string) {
		const encodedParams = new URLSearchParams();
		let translation: Translation[] = [];
		encodedParams.set('source', source);
		encodedParams.set('target', target);
		encodedParams.set('q',text);
		this.http.post<any>("https://google-translate1.p.rapidapi.com/language/translate/v2", encodedParams, { 
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'Accept-Encoding': 'application/gzip',
				'X-RapidAPI-Key': '7129e6cb40mshc5f5e8c740b6c5ap1dc6d9jsn1c9fbcfbf8d4',
				'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
			}
		}).subscribe(results => {
			translation = results.data.translations;
		});
		return translation;
	}

	constructor(private http: HttpClient) {}
}
