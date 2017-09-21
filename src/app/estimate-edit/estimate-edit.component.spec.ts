import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateEditComponent } from './estimate-edit.component';

describe('EstimateEditComponent', () => {
  let component: EstimateEditComponent;
  let fixture: ComponentFixture<EstimateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
