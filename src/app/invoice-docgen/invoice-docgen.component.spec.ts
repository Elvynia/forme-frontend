import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDocgenComponent } from './invoice-docgen.component';

describe('InvoiceDocgenComponent', () => {
  let component: InvoiceDocgenComponent;
  let fixture: ComponentFixture<InvoiceDocgenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDocgenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDocgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
