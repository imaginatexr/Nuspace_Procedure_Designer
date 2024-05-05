import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

import { from, Observable, Subscription } from 'rxjs';
import BpmnModeler from 'bpmn-js/lib/Modeler';

@Component({
  selector: 'app-diagram',
  template: `
    <div #ref class="diagram-container"></div>
    <button (click)="downloadBpmn()">Download BPMN</button>
  `,
  styles: [
    `
      .diagram-container {
        height: 500px;
        width: 150%;
      }
    `
  ]
})
export class DiagramComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {

  @ViewChild('ref', { static: true }) private el: ElementRef;
  @Input() private url?: string;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();
  private bpmnJS: BpmnJS = new BpmnJS();
 
 // private modeler: BpmnModeler;


  constructor(private http: HttpClient) {
    this.bpmnJS.on('import.done', ({ error }) => {
      if (!error) {
        this.bpmnJS.get('canvas').zoom('fit-viewport');
      }
    });
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  ngOnInit(): void {
    if (this.url) {
      this.loadUrl(this.url);
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    if (changes.url) {
      this.loadUrl(changes.url.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string): Subscription {
   console.log(url,'urlvalue');
    return (
      this.http.get(url, { responseType: 'text' }).pipe(
        switchMap((xml: string) => this.importDiagram(xml)),
        map(result => result.warnings),
      ).subscribe(
        (warnings) => {
          this.importDone.emit({
            type: 'success',
            warnings
          });
        },
        (err) => {
          this.importDone.emit({
            type: 'error',
            error: err
          });
        }
      )
    );
  }

  /**
   * Creates a Promise to import the given XML into the current
   * BpmnJS instance, then returns it as an Observable.
   *
   * @see https://github.com/bpmn-io/bpmn-js-callbacks-to-promises#importxml
   */
  private importDiagram(xml: string): Observable<{warnings: Array<any>}> {
    console.log(xml,'dmldata');
    return from(this.bpmnJS.importXML(xml) as Promise<{warnings: Array<any>}>);
  }

  downloadBpmn() {
    // Get BPMN XML content from the viewer
    this.bpmnJS.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error('Error saving BPMN:', err);
      } else {
        // Create a Blob from the XML content
        const blob = new Blob([xml], { type: 'application/xml' });

        // Create a download link and trigger download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'bpmn-diagram.bpmn';
        link.click();
      }
    });
  }


}
