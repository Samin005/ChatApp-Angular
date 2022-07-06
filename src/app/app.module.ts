import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RxStompService} from "./rx-stomp/rx-stomp.service";
import {rxStompServiceFactory} from "./rx-stomp/rx-stomp-service-factory";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: RxStompService, useFactory: rxStompServiceFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
