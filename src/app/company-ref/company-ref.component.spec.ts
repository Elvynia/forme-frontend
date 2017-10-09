import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRefComponent } from './company-ref.component';

describe('CompanyRefComponent', () => {
  let component: CompanyRefComponent;
  let fixture: ComponentFixture<CompanyRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
