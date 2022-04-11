import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NewComponentComponent } from './new-component/new-component.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { RegisterComponent } from './register/register.component';
import { StarsComponent } from './stars/stars.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NewComponentComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    GamesComponent,
    GameComponent,
    RegisterComponent,
    StarsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
      path:"",
      component:HomeComponent
    } ,    
     {
      path:"games",
      component:GamesComponent
    }
    ,    
     {
      path:"games/:gameId",
      component:GameComponent
    }
    ,    
     {
      path:"register",
      component:RegisterComponent
    }
  ]),
  ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
