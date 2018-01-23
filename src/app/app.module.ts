import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';


const appRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'to-do-list',      component: ToDoListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: ShoppingListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
