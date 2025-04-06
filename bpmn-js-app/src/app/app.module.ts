import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { DiagramComponent } from './diagram/diagram.component';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BpmnViewerComponent } from './CustomDiagram/bpmn-viewer/bpmn-viewer.component';
import { BpmnViewerFileComponent } from './CustomDiagram/bpmn-viewer-file/bpmn-viewer-file.component';

import { appRoutingModule } from './app.routing';
//fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

import { JwtInterceptor } from './_helpers/jwt.interceptors';
import { ErrorInterceptor } from './_helpers/error.interceptor';


import { HomeComponent } from './home';
import { LoginComponent } from './login';
//import {  LayOutComponent} from './layout/layout.component';

// import { RegisterComponent } from './register';
 import { AlertComponent } from './CustomDiagram/alert';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    BpmnViewerComponent,
     BpmnViewerFileComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    appRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true },
    { provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
