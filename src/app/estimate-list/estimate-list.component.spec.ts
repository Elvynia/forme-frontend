import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateListComponent } from './estimate-list.component';

describe('EstimateListComponent', () => {
  let component: EstimateListComponent;
  let fixture: ComponentFixture<EstimateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
