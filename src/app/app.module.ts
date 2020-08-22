import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Router, Routes } from "@angular/router"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FilterPipe } from './filter.pipe';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: '', component: MainComponent,},
  {path: "about", component: AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TodoItemComponent,
    FilterPipe,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
