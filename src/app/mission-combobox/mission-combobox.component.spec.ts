import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionComboboxComponent } from './mission-combobox.component';

describe('MissionComboboxComponent', () => {
  let component: MissionComboboxComponent;
  let fixture: ComponentFixture<MissionComboboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionComboboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
