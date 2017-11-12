import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFieldComponent } from './status-field.component';

describe('StatusFieldComponent', () => {
  let component: StatusFieldComponent;
  let fixture: ComponentFixture<StatusFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
