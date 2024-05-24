import { Routes } from '@angular/router';
import { TranslateComponent } from './components/translate/translate.component';
import { NewsComponent } from './components/news/news.component';
import { CarsComponent } from './components/cars/cars.component';
import { QRGeneratorComponent } from './components/qr-generator/qr-generator.component';

export const routes: Routes = [
	{ path: "translate", component: TranslateComponent },
	{ path: "news", component: NewsComponent},
	{ path: "cars", component: CarsComponent}, 
	{ path: "qr", component: QRGeneratorComponent}
];
