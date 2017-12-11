import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComboboxComponent } from './company-combobox.component';

describe('CompanyComboboxComponent', () => {
  let component: CompanyComboboxComponent;
  let fixture: ComponentFixture<CompanyComboboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyComboboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
