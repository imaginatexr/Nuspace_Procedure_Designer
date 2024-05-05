import { BrowserModule } from '@angular/platform-browser';
import { DiagramComponent } from './diagram/diagram.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BpmnViewerComponent } from './CustomDiagram/bpmn-viewer/bpmn-viewer.component';
import { BpmnViewerFileComponent } from './CustomDiagram/bpmn-viewer-file/bpmn-viewer-file.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    BpmnViewerComponent,
    BpmnViewerFileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
