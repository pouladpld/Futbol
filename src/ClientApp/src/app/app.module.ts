import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WorldCupComponent } from './components/world-cup/world-cup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompetitionService } from './services/competition.service';
import { RegistrationService } from './services/registration.service';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        WorldCupComponent,
        NavbarComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('/Futbol/sw.js', {enabled: environment.production}),
        RouterModule.forRoot(routes),
        HttpClientModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    providers: [
        RegistrationService,
        CompetitionService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}