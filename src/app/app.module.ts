import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

/*
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects',      component: ProjectsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: HomeComponent }
];*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
