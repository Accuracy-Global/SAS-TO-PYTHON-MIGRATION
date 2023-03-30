import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosSummaryComponent } from './macros-summary.component';

describe('MacrosSummaryComponent', () => {
  let component: MacrosSummaryComponent;
  let fixture: ComponentFixture<MacrosSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacrosSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacrosSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
