import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Router, Routes } from "@angular/router"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FilterPipe } from './filter.pipe';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from "@angular/common/http";
import { UsersComponent } from './about/users/users.component';
import { ContactComponent } from './contact/contact.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from "@angular/fire/auth"
import { environment } from '../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const routes: Routes = [
  {path: '', component: MainComponent, data: {
    cond: "active",
  }, resolve:{
    // resolve 負責非同步的東西
    // 會等跑完 resolve 才執行 construct
    // Call API 使用
    // 不建議呼叫太久，不然使用者體驗不好
    // 要等太久，建議先進去，做出 Loading 的圖示
  }},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "chat", component: ChatComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TodoItemComponent,
    FilterPipe,
    AboutComponent,
    UsersComponent,
    ContactComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
