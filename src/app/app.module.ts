import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { MainComponent } from './shared/main/main.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { AddNewSiteComponent } from './site-details/add-new-site/add-new-site.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideNavComponent,
    MainComponent,
    SiteDetailsComponent,
    AddNewSiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddNewSiteComponent]
})
export class AppModule { }
