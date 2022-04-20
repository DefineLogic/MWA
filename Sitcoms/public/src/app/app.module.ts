import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { AddSitcomComponent } from './addSitcom/addSitcom.component';
import { SitcomsComponent } from './sitcoms/sitcoms.component';
import { SitcomComponent } from './sitcom/sitcom.component';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './edit/edit.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    AddSitcomComponent,
    SitcomsComponent,
    SitcomComponent,
    EditComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    JwtHelperService,
    RouterModule.forRoot([
      {
      path:"",
      component:HomeComponent
    },    
    {
     path:"sitcoms",
     component:SitcomsComponent
   }
   ,    
    {
     path:"sitcoms/:sitcomId",
     component:SitcomComponent
   }
   ,    
   {
    path:"sitcoms/update/:sitcomId",
    component:EditComponent
  }
   ,    
    {
     path:"addsitcom",
     component:AddSitcomComponent
   },    
   {
    path:"register",
    component:RegisterComponent
  }
  ])
  ],
  providers: [{provide:JWT_OPTIONS,useValue:JWT_OPTIONS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
