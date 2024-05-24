import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { text } from "stream/consumers";

@Component({
  selector: 'qr-generator-component',
  standalone: true,
	imports: [FormsModule],
	providers: [HttpClient],
  templateUrl: './qr-generator.component.html',
})
export class QRGeneratorComponent {
	public qrText: string;
	public qrBase64: string;
	constructor(private http: HttpClient) {
		this.qrText = "";
		this.qrBase64 = "";
	}

	public generateQR() {
		this.http.get<string>('https://qr-code-generator20.p.rapidapi.com/generatebasicbase64?data=1234&size=500', {
			headers: {
				'X-RapidAPI-Key': '7129e6cb40mshc5f5e8c740b6c5ap1dc6d9jsn1c9fbcfbf8d4',
				'X-RapidAPI-Host': 'qr-code-generator20.p.rapidapi.com'
			},
			responseType: 'text' as 'json', 
			params: {
				data: this.qrText
			},
		}).subscribe(base64 => { 
				this.qrBase64 = `data:jpeg;base64,${base64}`;
		});
	}
}
