import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './common/modal/modal.component';
import { ShoppingListService } from './services/shopping-list.service';
import { FormItemComponent } from './shopping-list/form-item/form-item.component';
import { FormListComponent } from './shopping-list/form-list/form-list.component';
import { HomeComponent } from './home/home.component';
import { TipCalculatorComponent } from './tip-calculator/tip-calculator.component';


const appRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'tip-calculator', component: TipCalculatorComponent },
  { path: 'to-do-list',      component: ToDoListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ToDoListComponent,
    ModalComponent,
    FormItemComponent,
    FormListComponent,
    HomeComponent,
    TipCalculatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ModalService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
