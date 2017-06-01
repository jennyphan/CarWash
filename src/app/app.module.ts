import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './shared/directives/index';
import { WashComponent } from './wash/index';
import { WelcomeComponent } from './welcome/index';
import { HistoryComponent } from './history/index';
import { CompleteComponent } from './complete/index';
import { AlertService } from './shared/services/index';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AlertComponent,
    WashComponent,
    WelcomeComponent,
    HistoryComponent,
    CompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})

export class AppModule { }
