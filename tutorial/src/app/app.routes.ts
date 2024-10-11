import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsModule } from './modules/about-us/about-us.module';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
];
