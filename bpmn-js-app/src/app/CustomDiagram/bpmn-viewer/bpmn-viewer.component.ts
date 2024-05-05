import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import BpmnViewer from 'bpmn-js';

@Component({
  selector: 'app-bpmn-viewer',
  templateUrl: './bpmn-viewer.component.html',
  styleUrls: ['./bpmn-viewer.component.css']
})
export class BpmnViewerComponent implements OnInit {

  @ViewChild('bpmnContainer', { static: true }) private bpmnContainer: ElementRef;

  private viewer: BpmnViewer;
  diagramUrl = 'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';

  ngOnInit(): void {
    // Create an instance of the BPMN viewer
    this.viewer = new BpmnViewer({ container: this.bpmnContainer.nativeElement });

    // Load BPMN diagram (replace with your BPMN XML or file path)
    this.loadBpmnDiagram(this.diagramUrl);
  }

  loadBpmnDiagram(bpmnFilePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.viewer.importXML(bpmnFilePath, (err) => {
        if (err) {
          console.error('Error rendering BPMN:', err);
          reject(err);
        } else {
          console.log('BPMN rendered successfully');
          resolve();
        }
      });
    });
  }

  onFileSelected(event) {

   // const file:File = event.target.files[0];
    // console.log(file,'filePath');
     console.log(event.value,'url');

//     if (file) {

//     }
 }

//let _openLocalDiagram = function (event, openCallback) {    
  
   openLocalDiagram(event, openCallback) {        

  var input = event.target;
  var reader = new FileReader();
  reader.onload = function () {
      if (openCallback && typeof openCallback === 'function') {
          openCallback(reader.result);
      }

      console.log('end load diagram from local');
  };
  reader.readAsText(input.files[0]);  


  console.log(reader,'reader');
//  var fileNameSpan = $('span[id="bpmnFileName"]');
 // fileNameSpan.html(input.files[0]['name'].split('.')[0]);        
};

}