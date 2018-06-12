import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryGridComponent } from './country-grid.component';

describe('CountryGridComponent', () => {
  let component: CountryGridComponent;
  let fixture: ComponentFixture<CountryGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
