import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnViewerFileComponent } from './bpmn-viewer-file.component';

describe('BpmnViewerFileComponent', () => {
  let component: BpmnViewerFileComponent;
  let fixture: ComponentFixture<BpmnViewerFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpmnViewerFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmnViewerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
