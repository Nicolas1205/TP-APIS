import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";


interface Maker { 
	id: string, 
	name: string,
	models?: Model[],
}
interface Model {
	id: string,
	name: string,
}

@Component({
  selector: 'cars-component',
  standalone: true,
	providers: [HttpClient],
  imports: [FormsModule], 
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {
	makers: Maker[];
	currentMaker: Maker;
	constructor(private http: HttpClient) {
		this.makers = [];
		this.currentMaker = { id: "", name: ""};
	}
	ngOnInit() {
		this.http.get<Maker[]>("https://car-specs.p.rapidapi.com/v2/cars/makes", {
			headers: {
			'X-RapidAPI-Host': 'car-specs.p.rapidapi.com',
	 		'X-RapidAPI-Key': '7129e6cb40mshc5f5e8c740b6c5ap1dc6d9jsn1c9fbcfbf8d4'
			}
		}).subscribe(makers => {
				this.makers = makers;
		})
	}

	public getMakerModels(maker_id: string) {

		this.http.get<Model[]>(`https://car-specs.p.rapidapi.com/v2/cars/makes/${maker_id}/models`, { headers: {
			'X-RapidAPI-Host': 'car-specs.p.rapidapi.com',
			'X-RapidAPI-Key': '7129e6cb40mshc5f5e8c740b6c5ap1dc6d9jsn1c9fbcfbf8d4'
		}}).subscribe(models => {
			let maker = this.makers.find((maker) => maker.id === maker_id);
			if(maker !== undefined) {
				maker.models = models;
				this.currentMaker = maker;
			}
		});
	}
}
