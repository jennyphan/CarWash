import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/index';
import { WashComponent } from './wash/index';
import { HistoryComponent } from './history/index';
import { CompleteComponent } from './complete/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'wash', component: WashComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'complete', component: CompleteComponent },
    // { path: 'myaccount', loadChildren: './myaccount/myaccount.module#MyAccountModule' }, // for lazy loading
    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

export const routing = RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });
