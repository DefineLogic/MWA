import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { SitcomsComponent } from './sitcoms/sitcoms.component';
import { SitcomComponent } from './sitcom/sitcom.component';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    SitcomsComponent,
    SitcomComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
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
     path:"register",
     component:RegisterComponent
   }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
