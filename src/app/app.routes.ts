import { Routes } from '@angular/router';
import { TranslateComponent } from './components/translate/translate.component';
import { NewsComponent } from './components/news/news.component';
import { CarsComponent } from './components/cars/cars.component';

export const routes: Routes = [
	{ path: "translate", component: TranslateComponent },
	{ path: "news", component: NewsComponent},
	{ path: "cars", component: CarsComponent}
];
