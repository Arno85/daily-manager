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


const appRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'to-do-list',      component: ToDoListComponent },
  { path: '', redirectTo: 'shopping-list', pathMatch: 'full'},
  { path: '**', component: ShoppingListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ToDoListComponent,
    ModalComponent,
    FormItemComponent
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
