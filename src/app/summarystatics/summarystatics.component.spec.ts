import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarystaticsComponent } from './summarystatics.component';

describe('SummarystaticsComponent', () => {
  let component: SummarystaticsComponent;
  let fixture: ComponentFixture<SummarystaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarystaticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarystaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
